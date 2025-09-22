import { EnvironmentProviders } from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { browserPopupRedirectResolver, browserSessionPersistence, initializeAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

export function provideFirebase(): EnvironmentProviders[] {
	return [
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideAuth(() => initializeAuth(getApp(), {
			persistence: browserSessionPersistence,
			popupRedirectResolver: browserPopupRedirectResolver,
		})),
		provideDatabase(() => getDatabase(getApp(), environment.firebaseConfig.databaseURL)),
	];
}
