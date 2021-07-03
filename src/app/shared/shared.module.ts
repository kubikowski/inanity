import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DyslexicTextModule } from 'src/app/shared/dyslexic-text/dyslexic-text.module';
import { SharedHammerModule } from 'src/app/shared/hammer/shared-hammer.module';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
	exports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		DyslexicTextModule,
		SharedHammerModule,
		MaterialModule,
	],
})
export class SharedModule { }
