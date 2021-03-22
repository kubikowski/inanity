import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnekComponent } from 'src/app/pages/page-not-found/snek/snek.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [
		SnekComponent,
	],
	imports: [
		CommonModule,
		MatIconModule,
	],
	exports: [
		SnekComponent,
	],
})
export class SnekModule {
}
