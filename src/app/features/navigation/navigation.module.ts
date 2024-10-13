import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { HeaderComponent } from 'src/app/features/navigation/components/header/header.component';
import { SettingsComponent } from 'src/app/features/navigation/components/settings/settings.component';
import { SidebarItemComponent } from 'src/app/features/navigation/components/sidebar-item/sidebar-item.component';
import { SidebarComponent } from 'src/app/features/navigation/components/sidebar/sidebar.component';

@NgModule({
	declarations: [
		HeaderComponent,
		SettingsComponent,
		SidebarItemComponent,
		SidebarComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextComponent,
	],
	exports: [
		HeaderComponent,
		SidebarComponent,
	],
})
export class NavigationModule { }
