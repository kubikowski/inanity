import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GongRoutingModule } from 'src/app/pages/gong/gong-routing.module';
import { GongComponent } from 'src/app/pages/gong/gong.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [
		GongComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		GongRoutingModule,
		GongComponent,
	],
})
export class GongModule {
}
