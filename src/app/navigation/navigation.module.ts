import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './header/settings/settings.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';

@NgModule({
	declarations: [
		HeaderComponent,
		SettingsComponent,
		SidebarComponent,
		SidebarItemComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		HeaderComponent,
		SettingsComponent,
		SidebarComponent,
		SidebarItemComponent,
	],
})
export class NavigationModule {
}
