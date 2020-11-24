import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ColorsService } from 'src/app/shared/colors/services/colors.service';
import { DyslexicTextComponent } from 'src/app/shared/dyslexic-text/dyslexic-text.component';
import { DyslexicTextService } from 'src/app/shared/dyslexic-text/services/dyslexic-text.service';
import { SvgIconService } from 'src/app/shared/svg/svg-icon.service';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
	declarations: [
		DyslexicTextComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDividerModule,
		MatExpansionModule,
		MatIconModule,
		MatMenuModule,
		MatSidenavModule,
		MatSliderModule,
		MatToolbarModule,
		ReactiveFormsModule,
		FormsModule,
		MaterialModule,
	],
	exports: [
		CommonModule,
		RouterModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDividerModule,
		MatExpansionModule,
		MatIconModule,
		MatMenuModule,
		MatSidenavModule,
		MatSliderModule,
		MatToolbarModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		DyslexicTextComponent,
		MaterialModule,
	],
	providers: [
		ColorsService,
		DyslexicTextService,
		SvgIconService,
	],
})
export class SharedModule {
}
