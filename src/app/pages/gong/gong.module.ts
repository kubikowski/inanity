import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
		GongComponent,
	],
})
export class GongModule {
}
