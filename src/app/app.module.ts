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
import { HeaderComponent } from './navigation/header/header.component';
import { SettingsComponent } from './navigation/header/settings/settings.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { SidebarButtonComponent } from './navigation/sidebar/sidebar-button/sidebar-button.component';
import { DyslexicTextComponent } from './shared/dyslexic-text/dyslexic-text.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GongComponent } from './pages/gong/gong.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SettingsComponent,
		SidebarComponent,
		DyslexicTextComponent,
		PageNotFoundComponent,
		GongComponent,
		SidebarButtonComponent,
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
