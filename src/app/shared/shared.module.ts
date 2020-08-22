import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ColorsService } from './colors/services/colors.service';
import { DyslexicTextComponent } from './dyslexic-text/dyslexic-text.component';
import { DyslexicTextService } from './dyslexic-text/services/dyslexic-text.service';

@NgModule({
	declarations: [
		DyslexicTextComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDividerModule,
		MatIconModule,
		MatMenuModule,
		MatSidenavModule,
		MatSliderModule,
		MatToolbarModule,
		ReactiveFormsModule,
		FormsModule,
	],
	exports: [
		CommonModule,
		RouterModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDividerModule,
		MatIconModule,
		MatMenuModule,
		MatSidenavModule,
		MatSliderModule,
		MatToolbarModule,
		ReactiveFormsModule,
		FormsModule,

		DyslexicTextComponent,
	],
	providers: [
		ColorsService,
		DyslexicTextService,
	],
})
export class SharedModule {
}
