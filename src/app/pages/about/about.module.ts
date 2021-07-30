import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';
import { AboutRoutingModule } from 'src/app/pages/about/about-routing.module';
import { AboutComponent } from 'src/app/pages/about/about.component';

@NgModule({
	declarations: [
		AboutComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextModule,
	],
	exports: [
		AboutRoutingModule,
	],
})
export class AboutModule { }
