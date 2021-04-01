import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SnekComponent, SnekResultsComponent } from 'src/app/pages/page-not-found/snek/snek.component';

@NgModule({
	declarations: [
		SnekComponent,
		SnekResultsComponent,
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatDialogModule,
		MatIconModule,
	],
	exports: [
		SnekComponent,
		SnekResultsComponent,
	],
})
export class SnekModule {
}
