import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BackgroundComponent } from 'src/app/features/background/background.component';

@NgModule({
	declarations: [
		BackgroundComponent,
	],
	imports: [
		CoreModule,
	],
	exports: [
		BackgroundComponent,
	],
})
export class BackgroundModule { }
