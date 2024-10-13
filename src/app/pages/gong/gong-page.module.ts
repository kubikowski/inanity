import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { GongPageRoutingModule } from 'src/app/pages/gong/gong-page-routing.module';
import { GongPageComponent } from 'src/app/pages/gong/gong-page.component';

@NgModule({
	declarations: [
		GongPageComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextComponent,
	],
	exports: [
		GongPageRoutingModule,
	],
})
export class GongPageModule { }
