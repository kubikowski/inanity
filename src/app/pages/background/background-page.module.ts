import { NgModule } from '@angular/core';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';
import { BackgroundPageRoutingModule } from 'src/app/pages/background/background-page-routing.module';
import { BackgroundPageComponent } from 'src/app/pages/background/background-page.component';

@NgModule({
	declarations: [
		BackgroundPageComponent,
	],
	imports: [
		DyslexicTextModule,
	],
	exports: [
		BackgroundPageRoutingModule,
	],
})
export class BackgroundPageModule { }
