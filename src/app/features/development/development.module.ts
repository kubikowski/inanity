import { NgModule } from '@angular/core';
import { DevelopmentDirective } from 'src/app/features/development/directives/development.directive';

@NgModule({
	declarations: [
		DevelopmentDirective,
	],
	exports: [
		DevelopmentDirective,
	],
})
export class DevelopmentModule { }
