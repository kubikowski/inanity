import { NgModule } from '@angular/core';
import { HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { HammerConfig } from 'src/app/shared/hammer/hammer-config';

@NgModule({
	exports: [
		HammerModule,
	],
	providers: [{
		provide: HAMMER_GESTURE_CONFIG,
		useClass: HammerConfig,
	}],
})
export class SharedHammerModule { }
