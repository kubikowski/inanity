import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageNotFoundRoutingModule } from 'src/app/pages/page-not-found/page-not-found-routing.module';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { SnekModule } from 'src/app/pages/page-not-found/snek/snek.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [
		PageNotFoundComponent,
	],
	imports: [
		CommonModule,
		SnekModule,
		SharedModule,
	],
	exports: [
		PageNotFoundRoutingModule,
	],
})
export class PageNotFoundModule {
}
