import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { SnekModule } from 'src/app/features/snek/snek.module';
import { NotFoundPageRoutingModule } from 'src/app/pages/not-found/not-found-page-routing.module';
import { NotFoundPageComponent } from 'src/app/pages/not-found/not-found-page.component';

@NgModule({
	declarations: [
		NotFoundPageComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextComponent,
		SnekModule,
	],
	exports: [
		NotFoundPageRoutingModule,
	],
})
export class NotFoundPageModule { }
