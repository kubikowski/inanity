import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import {
	Auth,
	AuthCredential,
	EmailAuthProvider,
	GoogleAuthProvider,
	linkWithCredential,
	signInAnonymously,
	signInWithPopup,
	Unsubscribe,
	UserCredential,
	UserInfo,
} from '@angular/fire/auth';
import { timeout } from 'src/app/core/functions/promise/timeout.function';

@Injectable({ providedIn: 'root' })
export class FirebaseService implements OnDestroy {
	private readonly angularFireAuth = inject(Auth);

	private readonly emailAuthProvider = FirebaseService.getEmailAuthProvider();
	private readonly googleAuthProvider = FirebaseService.getGoogleAuthProvider();

	private readonly anonymousCredential = signal<UserCredential | null>(null);
	public readonly userCredential = signal<UserCredential | null>(null);
	public readonly authCredential = signal<AuthCredential | null>(null);

	// This field seems redundant, given that we have credentials. But I digress.
	private readonly authSubscriptionCallback: Unsubscribe;
	public readonly userInfo = signal<UserInfo | null>(null);
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
		return this.angularFireAuth.onAuthStateChanged(user => {
			console.log('Auth State Changed', user);

			if (user !== null) {
				this.userInfo.set(user);

				if (!user.isAnonymous) {
					this.authSuccess.set(true);
				}
			}
		});
	}

	// region Sign In
	private async anonymousSignIn(): Promise<void> {
		await timeout(5_000);
		if (this.userInfo() !== null) return;

		console.log('Attempting Anonymous SignIn');
		const anonymousCredential = await signInAnonymously(this.angularFireAuth);

		console.log('Anonymous SignIn Response', anonymousCredential);
		this.anonymousCredential.set(anonymousCredential);
	}

	// public async emailSignIn(email: string, password: string): Promise<void> {
	// 	// This is deprecated.
	// 	const signInMethods = await fetchSignInMethodsForEmail(this.angularFireAuth, email);
	// 	const userCredential = await signInWithPopup(this.angularFireAuth, this.emailAuthProvider);
	// 	const authCredential = EmailAuthProvider.credential(email, password);
	// }

	public async googleSignIn(): Promise<void> {
		console.log('sign in with popup');
		const userCredential = await signInWithPopup(this.angularFireAuth, this.googleAuthProvider);

		if (userCredential) {
			this.userCredential.set(userCredential);

			const authCredential = GoogleAuthProvider.credentialFromResult(userCredential);
			this.authCredential.set(authCredential);

			await this.upgradeAnonymousAccount();
		}
	}

	private async upgradeAnonymousAccount(): Promise<void> {
		const anonymousCredential = this.anonymousCredential();
		const authCredential = this.authCredential();

		if (anonymousCredential !== null && authCredential !== null) {
			await linkWithCredential(anonymousCredential.user, authCredential);
		}
	}
	// endregion Sign In


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
