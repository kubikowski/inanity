import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MalbolgeRoutingModule } from 'src/app/pages/malbolge/malbolge-routing.module';
import { MalbolgeSpecificationComponent } from 'src/app/pages/malbolge/malbolge-specification/malbolge-specification.component';
import { MalbolgeComponent } from 'src/app/pages/malbolge/malbolge.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [
		MalbolgeSpecificationComponent,
		MalbolgeComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		MalbolgeRoutingModule,
	]
})
export class MalbolgeModule {
}
