import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MalbolgeModule } from 'src/app/features/malbolge/malbolge.module';
import { MalbolgePageRoutingModule } from 'src/app/pages/malbolge/malbolge-page-routing.module';
import { MalbolgePageComponent } from 'src/app/pages/malbolge/malbolge-page.component';

@NgModule({
	declarations: [
		MalbolgePageComponent,
	],
	imports: [
		CoreModule,
		MalbolgeModule,
	],
	exports: [
		MalbolgePageRoutingModule,
	],
})
export class MalbolgePageModule { }
