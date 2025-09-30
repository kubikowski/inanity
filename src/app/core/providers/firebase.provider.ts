import { EnvironmentProviders } from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { browserLocalPersistence, browserPopupRedirectResolver, initializeAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

export function provideFirebase(): EnvironmentProviders[] {
	return [
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideAuth(() => initializeAuth(getApp(), {
			persistence: browserLocalPersistence,
			popupRedirectResolver: browserPopupRedirectResolver,
		})),
		provideFirestore(() => getFirestore(getApp())),
	];
}
