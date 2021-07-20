import { NgModule } from '@angular/core';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';
import { BackgroundNoiseComponent } from 'src/app/pages/background/background-noise.component';
import { BackgroundRoutingModule } from 'src/app/pages/background/background-routing.module';

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
