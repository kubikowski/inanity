import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ClockComponent } from 'src/app/features/clock/clock.component';

@NgModule({
	declarations: [
		ClockComponent,
	],
	imports: [
		CoreModule,
	],
	exports: [
		ClockComponent,
	],
})
export class ClockModule { }
