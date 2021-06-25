import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnekGridNodeComponent } from 'src/app/pages/not-found/snek/snek-grid/snek-grid-node/snek-grid-node.component';
import { SnekGridComponent } from 'src/app/pages/not-found/snek/snek-grid/snek-grid.component';
import { SnekOptionsComponent } from 'src/app/pages/not-found/snek/snek-options/snek-options.component';
import { SnekResultsComponent } from 'src/app/pages/not-found/snek/snek-results/snek-results.component';
import { SnekComponent } from 'src/app/pages/not-found/snek/snek.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [
		SnekGridNodeComponent,
		SnekGridComponent,
		SnekOptionsComponent,
		SnekResultsComponent,
		SnekComponent,
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
