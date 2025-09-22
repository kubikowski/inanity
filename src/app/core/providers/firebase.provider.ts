import { EnvironmentProviders } from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { browserPopupRedirectResolver, browserSessionPersistence, initializeAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

export function provideFirebase(): EnvironmentProviders[] {
	return [
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideAuth(() => initializeAuth(getApp(), {
			persistence: browserSessionPersistence,
			popupRedirectResolver: browserPopupRedirectResolver,
		})),
		// Realtime Database disabled in favor of Firestore Database
		// provideDatabase(() => getDatabase(getApp(), environment.firebaseConfig.databaseURL)),
		provideFirestore(() => getFirestore(getApp())),
	];
}
