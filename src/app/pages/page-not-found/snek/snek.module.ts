import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnekComponent } from 'src/app/pages/page-not-found/snek/snek.component';

@NgModule({
	declarations: [
		SnekComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		SnekComponent,
	],
})
export class SnekModule {
}
