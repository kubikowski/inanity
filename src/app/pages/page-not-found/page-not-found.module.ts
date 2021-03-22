import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { PageNotFoundRoutingModule } from 'src/app/pages/page-not-found/page-not-found-routing.module';
import { SnekModule } from 'src/app/pages/page-not-found/snek/snek.module';

@NgModule({
	declarations: [
		PageNotFoundComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		SnekModule,
	],
	exports: [
		PageNotFoundRoutingModule,
		PageNotFoundComponent,
	],
})
export class PageNotFoundModule {
}
