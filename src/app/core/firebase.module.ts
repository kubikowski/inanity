import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

@NgModule({
	imports: [
		AngularFireModule.initializeApp(environment.firebaseConfig),
	],
})
export class FirebaseModule { }
