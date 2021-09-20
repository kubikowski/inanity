import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DyslexicTextComponent } from 'src/app/features/dyslexic-text/dyslexic-text.component';

@NgModule({
	declarations: [
		DyslexicTextComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		DyslexicTextComponent,
	],
})
export class DyslexicTextModule { }
