import { inject, Injectable, OnDestroy, signal, untracked } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { auth } from 'firebaseui';

@Injectable({ providedIn: 'root' })
export class FirebaseService implements OnDestroy {
	private readonly auth = inject(Auth);
	private readonly authUI = new auth.AuthUI(this.auth);

	public readonly user = signal<firebase.UserInfo | null>(null);
	public readonly authSuccess = signal(false);
	public readonly authFailure = signal(false);

	private readonly firebaseAuthConfig: auth.Config = {
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccessWithAuthResult: (authResult: unknown, redirectUrl?: string) => {
				console.log('Sign In Success', authResult, redirectUrl);
				this.user.set(authResult as firebase.UserInfo);
				this.authSuccess.set(true);
				return false;
			},
			signInFailure: async (error: auth.AuthUIError) => {
				console.warn('Sign In Failure', error);
				this.authFailure.set(true);
				await new Promise(() => {});
			},
		},
	};

	private readonly authSubscriptionCallback = this.auth.onAuthStateChanged(user => {
		console.log('Auth State Changed', user);

		if (user !== null) {
			this.user.set(user);
			this.authSuccess.set(true);
		}
	});

	public ngOnDestroy(): void {
		this.authSubscriptionCallback();
	}

	public attachAuthUI(): void {
		if (untracked(this.user) === null) {
			this.authUI.start('#firebaseui-auth-container', this.firebaseAuthConfig);
		}
	}
}
