import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';
import { SnekModule } from 'src/app/features/snek/snek.module';
import { NotFoundPageRoutingModule } from 'src/app/pages/not-found/not-found-page-routing.module';
import { NotFoundPageComponent } from 'src/app/pages/not-found/not-found-page.component';

@NgModule({
	declarations: [
		NotFoundPageComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextModule,
		SnekModule,
	],
	exports: [
		NotFoundPageRoutingModule,
	],
})
export class NotFoundPageModule { }
