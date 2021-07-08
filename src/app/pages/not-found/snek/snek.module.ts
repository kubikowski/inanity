import { NgModule } from '@angular/core';
import { SnekResultsDialogComponent } from 'src/app/pages/not-found/snek/components/dialog/snek-results-dialog/snek-results-dialog.component';
import { SnekGridNodeComponent } from 'src/app/pages/not-found/snek/components/snek-grid-node/snek-grid-node.component';
import { SnekGridComponent } from 'src/app/pages/not-found/snek/components/snek-grid/snek-grid.component';
import { SnekOptionsComponent } from 'src/app/pages/not-found/snek/components/snek-options/snek-options.component';
import { SnekComponent } from 'src/app/pages/not-found/snek/snek.component';
import { JoystickModule } from 'src/app/shared/joystick/joystick.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [
		SnekResultsDialogComponent,
		SnekGridNodeComponent,
		SnekGridComponent,
		SnekOptionsComponent,
		SnekComponent,
	],
	imports: [
		SharedModule,
		JoystickModule,
	],
	exports: [
		SnekComponent,
	],
})
export class SnekModule { }
