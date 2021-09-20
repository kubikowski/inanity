import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { AboutModule } from 'src/app/features/about/about.module';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';
import { AboutPageRoutingModule } from 'src/app/pages/about/about-page-routing.module';
import { AboutPageComponent } from 'src/app/pages/about/about-page.component';

@NgModule({
	declarations: [
		AboutPageComponent,
	],
	imports: [
		CoreModule,
		AboutModule,
	],
	exports: [
		AboutPageRoutingModule,
	],
})
export class AboutPageModule { }
