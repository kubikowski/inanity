import { NgModule } from '@angular/core';
import { JoystickComponent } from 'src/app/shared/joystick/joystick.component';

@NgModule({
	declarations: [
		JoystickComponent,
	],
	exports: [
		JoystickComponent,
	],
})
export class JoystickModule { }
