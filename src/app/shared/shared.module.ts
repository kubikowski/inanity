import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';

import { ColorsService } from 'src/app/shared/colors/services/colors.service';
import { DyslexicTextComponent } from 'src/app/shared/dyslexic-text/dyslexic-text.component';
import { DyslexicTextService } from 'src/app/shared/dyslexic-text/services/dyslexic-text.service';
import { SvgIconService } from 'src/app/shared/svg/svg-icon.service';

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
