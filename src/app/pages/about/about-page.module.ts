import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';
import { AboutPageRoutingModule } from 'src/app/pages/about/about-page-routing.module';
import { AboutPageComponent } from 'src/app/pages/about/about-page.component';

@NgModule({
	declarations: [
		AboutPageComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextModule,
	],
	exports: [
		AboutPageRoutingModule,
	],
})
export class AboutPageModule { }
