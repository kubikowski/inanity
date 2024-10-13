import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { AboutCardComponent } from 'src/app/features/about/components/about-card/about-card.component';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';

@NgModule({
	declarations: [
		AboutCardComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextComponent,
	],
	exports: [
		AboutCardComponent,
	],
})
export class AboutModule { }
