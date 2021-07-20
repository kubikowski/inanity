import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';
import { GongRoutingModule } from 'src/app/pages/gong/gong-routing.module';
import { GongComponent } from 'src/app/pages/gong/gong.component';

@NgModule({
	declarations: [
		GongComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextModule,
	],
	exports: [
		GongRoutingModule,
	],
})
export class GongModule { }
