import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_ICON_DEFAULT_OPTIONS, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	providers: [
		{ provide: MAT_ICON_DEFAULT_OPTIONS, useValue: { fontSet: 'material-symbols-rounded' } },
	],
	exports: [
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDialogModule,
		MatDividerModule,
		MatIconModule,
		MatMenuModule,
		MatSidenavModule,
		MatSlideToggleModule,
		MatSliderModule,
		MatToolbarModule,
		MatTooltipModule,
	],
})
export class MaterialModule { }
