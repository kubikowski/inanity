export enum AuthScreen {
	AUTH_SELECTION = 'AUTH_SELECTION',
	GOOGLE_AUTH = 'GOOGLE_AUTH',
	EMAIL_AUTH = 'EMAIL_AUTH',
	SUCCESS = 'SUCCESS',
	FAILURE = 'FAILURE',
}

export abstract class AuthScreenUtility {
	public static returnToSelection(authScreen: AuthScreen): boolean {
		switch (authScreen) {
			case AuthScreen.GOOGLE_AUTH:
			case AuthScreen.EMAIL_AUTH:
				return true;
			default:
				return false;
		}
	}
}
