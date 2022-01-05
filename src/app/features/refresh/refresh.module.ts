import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { RefreshClassPipe } from 'src/app/features/refresh/pipes/refresh-class.pipe';
import { RefreshIconPipe } from 'src/app/features/refresh/pipes/refresh-icon.pipe';
import { RefreshTooltipPipe } from 'src/app/features/refresh/pipes/refresh-tooltip.pipe';
import { RefreshButtonComponent } from 'src/app/features/refresh/refresh-button/refresh-button.component';
import { RefreshIconComponent } from 'src/app/features/refresh/refresh-icon/refresh-icon.component';

@NgModule({
	declarations: [
		RefreshClassPipe,
		RefreshIconPipe,
		RefreshTooltipPipe,
		RefreshButtonComponent,
		RefreshIconComponent,
	],
	imports: [
		CoreModule,
	],
	exports: [
		RefreshButtonComponent,
		RefreshIconComponent,
	],
})
export class RefreshModule { }
