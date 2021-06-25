import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnekResultsComponent } from 'src/app/pages/not-found/snek/snek-results/snek-results.component';
import { SnekComponent } from 'src/app/pages/not-found/snek/snek.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [
		SnekComponent,
		SnekResultsComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		SnekComponent,
	],
})
export class SnekModule {
}
