import { AuthProvider } from './auth-provider.enum';

export enum AuthScreen {
	AUTH_SELECTION = 'AUTH_SELECTION',
	GOOGLE_AUTH = 'GOOGLE_AUTH',
	EMAIL_AUTH = 'EMAIL_AUTH',
	CREATE_ACCOUNT = 'CREATE_ACCOUNT',
	RECOVER_PASSWORD = 'RECOVER_PASSWORD',
	OAUTH_FAILURE = 'OAUTH_FAILURE',
	EMAIL_FAILURE = 'EMAIL_FAILURE',
	SUCCESS = 'SUCCESS',
}

export abstract class AuthScreenUtility {
	public static getTitle(authScreen: AuthScreen): string {
		switch (authScreen) {
			case AuthScreen.CREATE_ACCOUNT:
				return 'Sign Up';
			case AuthScreen.RECOVER_PASSWORD:
				return 'Recover Password';
			case AuthScreen.SUCCESS:
				return 'Signed In';
			case AuthScreen.OAUTH_FAILURE:
			case AuthScreen.EMAIL_FAILURE:
				return 'Sign In Failed';
			default:
				return 'Sign In';
		}
	}

	public static canGoBack(authScreen: AuthScreen): boolean {
		return this.getBackTarget(authScreen) !== null;
	}

	public static canSignIn(authScreen: AuthScreen): boolean {
		return authScreen === AuthScreen.EMAIL_AUTH;
	}

	public static canSignUp(authScreen: AuthScreen): boolean {
		return authScreen === AuthScreen.CREATE_ACCOUNT;
	}

	public static canRecover(authScreen: AuthScreen): boolean {
		return authScreen === AuthScreen.RECOVER_PASSWORD;
	}

	/**
	 * It would probably be more ideal to statefully maintain the previous
	 * authScreen, and use that as the back target. But I digress,
	 * this method is useful for visualizing the tree.
	 */
	public static getBackTarget(authScreen: AuthScreen): AuthScreen | null {
		switch (authScreen) {
			case AuthScreen.GOOGLE_AUTH:
			case AuthScreen.EMAIL_AUTH:
			case AuthScreen.OAUTH_FAILURE:
				return AuthScreen.AUTH_SELECTION;
			case AuthScreen.CREATE_ACCOUNT:
			case AuthScreen.RECOVER_PASSWORD:
				return AuthScreen.EMAIL_AUTH;
			default:
				return null;
		}
	}

	public static getFailureMode(authProvider: AuthProvider | null): AuthScreen {
		switch (authProvider) {
			case AuthProvider.EMAIL:
				return AuthScreen.EMAIL_FAILURE;
			case AuthProvider.GOOGLE:
				return AuthScreen.OAUTH_FAILURE;
			case null:
				return AuthScreen.AUTH_SELECTION;
		}
	}
}
