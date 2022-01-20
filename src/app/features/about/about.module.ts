import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { AboutCardComponent } from 'src/app/features/about/components/about-card/about-card.component';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';

@NgModule({
	declarations: [
		AboutCardComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextModule,
	],
	exports: [
		AboutCardComponent,
	],
})
export class AboutModule { }
