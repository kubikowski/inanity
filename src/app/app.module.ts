import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BackgroundComponent } from 'src/app/features/background/components/background/background.component';
import { HeaderComponent } from 'src/app/features/navigation/components/header/header.component';
import { SidebarComponent } from 'src/app/features/navigation/components/sidebar/sidebar.component';

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule,
		BackgroundComponent,
		HeaderComponent,
		SidebarComponent,
	],
	bootstrap: [ AppComponent ],
})
export class AppModule { }
