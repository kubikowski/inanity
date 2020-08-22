import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GongRoutingModule } from './gong-routing.module';
import { GongComponent } from './gong.component';
import { SharedModule } from '../../shared/shared.module';

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
