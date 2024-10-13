import { provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { routes } from 'src/app/core/routing/routes';
import { environment } from 'src/environments/environment';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideHttpClient(),
		provideAnimations(),
		{ provide: MAT_ICON_DEFAULT_OPTIONS, useValue: { fontSet: 'material-symbols-rounded' } },
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideRouter(routes),
	],
}).catch(err => console.error(err));
