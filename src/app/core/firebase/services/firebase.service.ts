import { computed, inject, Injectable, isDevMode, linkedSignal, OnDestroy, signal } from '@angular/core';
import {
	Auth, AuthCredential, EmailAuthProvider, GoogleAuthProvider,
	signInAnonymously, signInWithEmailAndPassword, signInWithPopup, Unsubscribe, User, UserCredential,
} from '@angular/fire/auth';
import { timeout } from 'src/app/core/functions/promise/timeout.function';

@Injectable({ providedIn: 'root' })
export class FirebaseService implements OnDestroy {
	private readonly auth = inject(Auth);

	private readonly emailAuthProvider = FirebaseService.getEmailAuthProvider();
	private readonly googleAuthProvider = FirebaseService.getGoogleAuthProvider();

	// These fields seem a bit redundant, given that we auth state subscription. But I digress.
	public readonly anonymousCredential = signal<UserCredential | null>(null);
	public readonly identifiedCredential = signal<UserCredential | null>(null);
	public readonly authCredential = signal<AuthCredential | null>(null);

	public readonly anonymousUser = linkedSignal<User | null>(() => this.anonymousCredential()?.user ?? null);
	public readonly identifiedUser = linkedSignal<User | null>(() => this.identifiedCredential()?.user ?? null);

	public readonly userInfo = computed(() => this.identifiedUser() ?? this.anonymousUser());
	public readonly userId = computed(() => this.userInfo()?.uid ?? null);

	private readonly authSubscriptionCallback: Unsubscribe;
	public readonly authSuccess = signal(false);
	public readonly authFailure = signal(false);

	public constructor() {
		this.authSubscriptionCallback = this.getAuthStateSubscription();

		this.anonymousSignIn()
			.catch(console.error);
	}

	public ngOnDestroy(): void {
		this.authSubscriptionCallback();
	}

	private getAuthStateSubscription(): Unsubscribe {
		return this.auth.onAuthStateChanged(user => {
			if (user === null) return;
			if (isDevMode()) console.log('Auth State Changed', user);

			if (user.isAnonymous) {
				this.anonymousUser.set(user);
			} else {
				this.identifiedUser.set(user);
				this.authSuccess.set(true);
			}
		});
	}

	// region Anonymous Sign In
	private async anonymousSignIn(): Promise<void> {
		await timeout(5_000);
		if (this.userInfo() !== null) return;

		if (isDevMode()) console.log('Attempting Anonymous SignIn');
		const anonymousCredential = await signInAnonymously(this.auth);

		if (isDevMode()) console.log('Anonymous SignIn Response', anonymousCredential);
		this.anonymousCredential.set(anonymousCredential);
	}
	// endregion Anonymous Sign In


	// region Email Sign In
	public async emailSignIn(email: string, password: string): Promise<void> {
		if (isDevMode()) console.log('attempting email & password sign in');
		await this.signInHandler(this.attemptEmailSignIn(email, password));
	}

	private async attemptEmailSignIn(email: string, password: string): Promise<void> {
		const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
		this.identifiedCredential.set(userCredential);

		const authCredential = EmailAuthProvider.credential(email, password);
		this.authCredential.set(authCredential);
	}
	// endregion Email Sign In


	// region Google Sign In
	public async googleSignIn(): Promise<void> {
		if (isDevMode()) console.log('attempting google sign in');
		await this.signInHandler(this.attemptGoogleSignIn());
	}

	private async attemptGoogleSignIn(): Promise<void> {
		const userCredential = await signInWithPopup(this.auth, this.googleAuthProvider);
		this.identifiedCredential.set(userCredential);

		const authCredential = GoogleAuthProvider.credentialFromResult(userCredential);
		this.authCredential.set(authCredential);
	}
	// endregion Google Sign In


	private async signInHandler(signInAttempt: Promise<void>): Promise<void> {
		await signInAttempt
			.then(() => {
				this.authSuccess.set(true);
			})
			.catch(error => {
				console.error(error);

				this.authFailure.set(true);
				setTimeout(() => this.authFailure.set(false), 100);
			});
	}


	// region Auth Providers
	private static getEmailAuthProvider(): EmailAuthProvider {
		return new EmailAuthProvider();
	}

	private static getGoogleAuthProvider(): GoogleAuthProvider {
		const provider = new GoogleAuthProvider();

		provider.addScope('profile');
		provider.addScope('email');

		return provider;
	}
	// endregion Auth Providers
}
