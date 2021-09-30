import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BackgroundComponent } from 'src/app/features/background/background.component';
import { ClockModule } from 'src/app/features/clock/clock.module';

@NgModule({
	declarations: [
		BackgroundComponent,
	],
	imports: [
		ClockModule,
		CoreModule,
	],
	exports: [
		BackgroundComponent,
	],
})
export class BackgroundModule { }
