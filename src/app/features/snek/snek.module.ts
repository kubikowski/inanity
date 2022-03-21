import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { JoystickModule } from 'src/app/features/joystick/joystick.module';
import { SnekResultsDialogComponent } from 'src/app/features/snek/components/dialog/snek-results-dialog/snek-results-dialog.component';
import { SnekGridNodeComponent } from 'src/app/features/snek/components/snek-grid-node/snek-grid-node.component';
import { SnekGridComponent } from 'src/app/features/snek/components/snek-grid/snek-grid.component';
import { SnekOptionsComponent } from 'src/app/features/snek/components/snek-options/snek-options.component';
import { SnekDirectionPipe } from 'src/app/features/snek/pipes/snek-direction.pipe';
import { SnekIconPipe } from 'src/app/features/snek/pipes/snek-icon.pipe';
import { SnekComponent } from 'src/app/features/snek/snek.component';

@NgModule({
	declarations: [
		SnekResultsDialogComponent,
		SnekGridNodeComponent,
		SnekGridComponent,
		SnekOptionsComponent,
		SnekDirectionPipe,
		SnekIconPipe,
		SnekComponent,
	],
	imports: [
		CoreModule,
		JoystickModule,
	],
	exports: [
		SnekComponent,
	],
})
export class SnekModule { }
