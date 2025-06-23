import { provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { provideMaterialConfiguration } from 'src/app/core/providers/material-configuration.provider';
import { routes } from 'src/app/core/routing/routes';
import { environment } from 'src/environments/environment';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideAnimations(),
		provideHttpClient(),
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideAuth(() => getAuth()),
		provideMaterialConfiguration(),
		provideRouter(routes),
	],
}).catch(err => console.error(err));
