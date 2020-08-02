// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';

// Custom
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SettingsComponent } from './app-header/settings/settings.component';
import { DyslexicTextComponent } from './shared/dyslexic-text/dyslexic-text.component';
import { GongComponent } from './pages/gong/gong.component';

@NgModule({
	declarations: [
		AppComponent,
		AppHeaderComponent,
		SettingsComponent,
		DyslexicTextComponent,
		GongComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDividerModule,
		MatIconModule,
		MatMenuModule,
		MatSidenavModule,
		MatSliderModule,
		MatToolbarModule,
		ReactiveFormsModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
