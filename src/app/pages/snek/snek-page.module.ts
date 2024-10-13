import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { SnekModule } from 'src/app/features/snek/snek.module';
import { SnekPageRoutingModule } from 'src/app/pages/snek/snek-page-routing.module';
import { SnekPageComponent } from 'src/app/pages/snek/snek-page.component';

@NgModule({
	declarations: [
		SnekPageComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextComponent,
		SnekModule,
	],
	exports: [
		SnekPageRoutingModule,
	],
})
export class SnekPageModule { }
