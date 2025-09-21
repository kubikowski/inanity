export enum AuthScreen {
	AUTH_SELECTION = 'AUTH_SELECTION',
	GOOGLE_AUTH = 'GOOGLE_AUTH',
	EMAIL_AUTH = 'EMAIL_AUTH',
	EMAIL_PASSWORD = 'EMAIL_PASSWORD',
	EMAIL_SIGN_UP = 'EMAIL_SIGN_UP',
	RECOVER_PASSWORD = 'RECOVER_PASSWORD',
	SUCCESS = 'SUCCESS',
	FAILURE = 'FAILURE',
}

export abstract class AuthScreenUtility {

	public static canGoBack(authScreen: AuthScreen): boolean {
		return this.getBackTarget(authScreen) !== null;
	}

	public static canGoNext(authScreen: AuthScreen): boolean {
		return this.getNextTarget(authScreen) !== null;
	}

	public static canSubmit(authScreen: AuthScreen): boolean {
		switch (authScreen) {
			case AuthScreen.EMAIL_PASSWORD:
			case AuthScreen.EMAIL_SIGN_UP:
				return true;
			default:
				return false;
		}
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
				return AuthScreen.AUTH_SELECTION;
			case AuthScreen.EMAIL_PASSWORD:
			case AuthScreen.EMAIL_SIGN_UP:
			case AuthScreen.RECOVER_PASSWORD:
				return AuthScreen.EMAIL_AUTH;
			default:
				return null;
		}
	}

	public static getNextTarget(authScreen: AuthScreen): AuthScreen | null {
		switch (authScreen) {
			case AuthScreen.EMAIL_AUTH:
				return AuthScreen.EMAIL_PASSWORD;
			default:
				return null;
		}
	}
}
