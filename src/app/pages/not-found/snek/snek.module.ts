import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SnekComponent, SnekResultsComponent } from 'src/app/pages/not-found/snek/snek.component';

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
