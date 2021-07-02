import { NgModule } from '@angular/core';
import { NotFoundRoutingModule } from 'src/app/pages/not-found/not-found-routing.module';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { SnekModule } from 'src/app/pages/not-found/snek/snek.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [
		NotFoundComponent,
	],
	imports: [
		SnekModule,
		SharedModule,
	],
	exports: [
		NotFoundRoutingModule,
	],
})
export class NotFoundModule { }
