import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';
import { GongPageRoutingModule } from 'src/app/pages/gong/gong-page-routing.module';
import { GongPageComponent } from 'src/app/pages/gong/gong-page.component';

@NgModule({
	declarations: [
		GongPageComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextModule,
	],
	exports: [
		GongPageRoutingModule,
	],
})
export class GongPageModule { }
