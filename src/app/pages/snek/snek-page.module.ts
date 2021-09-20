import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';
import { SnekModule } from 'src/app/features/snek/snek.module';
import { SnekPageRoutingModule } from 'src/app/pages/snek/snek-page-routing.module';
import { SnekPageComponent } from 'src/app/pages/snek/snek-page.component';

@NgModule({
	declarations: [
		SnekPageComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextModule,
		SnekModule,
	],
	exports: [
		SnekPageRoutingModule,
	],
})
export class SnekPageModule { }
