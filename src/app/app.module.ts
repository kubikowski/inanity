// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GongModule } from './pages/gong/gong.module';

@NgModule({
	declarations: [
		AppComponent,
		PageNotFoundComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,

		NavigationModule,
		SharedModule,

		// pages
		GongModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
