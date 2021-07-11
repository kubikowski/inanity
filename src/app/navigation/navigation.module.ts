import { NgModule } from '@angular/core';
import { BackgroundComponent } from 'src/app/navigation/background/background.component';
import { HeaderComponent } from 'src/app/navigation/header/header.component';
import { SettingsComponent } from 'src/app/navigation/header/settings/settings.component';
import { SidebarItemComponent } from 'src/app/navigation/sidebar/sidebar-item/sidebar-item.component';
import { SidebarComponent } from 'src/app/navigation/sidebar/sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [
		BackgroundComponent,
		HeaderComponent,
		SettingsComponent,
		SidebarComponent,
		SidebarItemComponent,
	],
	imports: [
		SharedModule,
	],
	exports: [
		BackgroundComponent,
		HeaderComponent,
		SettingsComponent,
		SidebarComponent,
		SidebarItemComponent,
	],
})
export class NavigationModule { }
