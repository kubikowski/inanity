import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { NavigationModule } from 'src/app/navigation/navigation.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		NavigationModule,
		SharedModule,
	],
	providers: [],
	bootstrap: [ AppComponent ],
})
export class AppModule { }
