import { computed, inject, Injectable } from '@angular/core';
import { ColorThemeDialogComponent } from 'src/app/core/colors/components/color-theme-dialog/color-theme-dialog.component';
import { DialogService } from 'src/app/features/dialogs/services/dialog.service';
import { HeaderItem } from '../models/header-item.model';

@Injectable({ providedIn: 'root' })
export class HeaderService {
	private readonly dialogService = inject(DialogService);

	// region Settings
	public readonly settingsItems = computed<HeaderItem[]>(() => [
		this.changeColorThemeHeaderItem(),
	].filter(headerItem => headerItem.authorized));

	private readonly changeColorThemeHeaderItem = computed<HeaderItem>(() => ({
		title: 'Color Theme',
		icon: 'format_paint',
		action: () => this.changeColorTheme(),
		authorized: true,
	}));
	// endregion Settings


	// region Actions
	private changeColorTheme(): void {
		this.dialogService.static(ColorThemeDialogComponent);
	}
	// endregion Actions
}
