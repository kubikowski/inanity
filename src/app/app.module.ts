import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BackgroundModule } from 'src/app/features/background/background.module';
import { NavigationModule } from 'src/app/features/navigation/navigation.module';

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule,
		BackgroundModule,
		NavigationModule,
	],
	bootstrap: [ AppComponent ],
})
export class AppModule { }
