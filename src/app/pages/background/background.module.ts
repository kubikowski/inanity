import { NgModule } from '@angular/core';
import { BackgroundNoiseComponent } from 'src/app/pages/background/background-noise.component';
import { BackgroundRoutingModule } from 'src/app/pages/background/background-routing.module';
import { DyslexicTextModule } from 'src/app/shared/dyslexic-text/dyslexic-text.module';

@NgModule({
	declarations: [
		BackgroundNoiseComponent,
	],
	imports: [
		DyslexicTextModule,
	],
	exports: [
		BackgroundRoutingModule,
	],
})
export class BackgroundModule { }
