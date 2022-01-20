import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

@NgModule({
	imports: [
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
	],
})
export class FirebaseModule { }
