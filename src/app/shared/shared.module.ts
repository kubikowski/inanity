import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ColorsService } from './colors/services/colors.service';
import { DyslexicTextComponent } from './dyslexic-text/dyslexic-text.component';
import { DyslexicTextService } from './dyslexic-text/services/dyslexic-text.service';
import { SvgIconService } from './svg/svg-icon.service';
import { MaterialModule } from './material.module';

@NgModule({
	declarations: [
		DyslexicTextComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
	],
	exports: [
		CommonModule,
		RouterModule,
		HttpClientModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		DyslexicTextComponent,
	],
	providers: [
		ColorsService,
		DyslexicTextService,
		SvgIconService,
	],
})
export class SharedModule {
}
