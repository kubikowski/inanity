import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { MalbolgeRoutingModule } from './malbolge-routing.module';
import { MalbolgeComponent } from './malbolge.component';

@NgModule({
	declarations: [
		MalbolgeComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		MalbolgeRoutingModule,
		MalbolgeComponent,
	]
})
export class MalbolgeModule {
}
