import { computed, inject, Injectable, isDevMode } from '@angular/core';
import { DialogService } from 'src/app/core/dialogs/services/dialog.service';
import { HeaderItem } from '../models/header-item.model';

@Injectable({ providedIn: 'root' })
export class HeaderService {
	private readonly dialogService = inject(DialogService);

	// region Settings
	public readonly settingsItems = computed<HeaderItem[]>(() => [
		this.authenticationItem(),
		this.colorThemeHeaderItem(),
		this.backgroundHeaderItem(),
		this.dyslexiaHeaderItem(),
	].filter(headerItem => headerItem.authorized));

	private readonly authenticationItem = computed<HeaderItem>(() => ({
		title: 'Sign In',
		icon: 'login',
		action: () => this.authentication(),
		authorized: isDevMode(),
	}));

	private readonly colorThemeHeaderItem = computed<HeaderItem>(() => ({
		title: 'Color Theme',
		icon: 'format_paint',
		action: () => this.colorTheme(),
		authorized: true,
	}));

	private readonly backgroundHeaderItem = computed<HeaderItem>(() => ({
		title: 'Background',
		icon: 'wallpaper',
		action: () => this.background(),
		authorized: true,
	}));

	private readonly dyslexiaHeaderItem = computed<HeaderItem>(() => ({
		title: 'Dyslexia',
		icon: 'key_visualizer',
		action: () => this.dyslexia(),
		authorized: true,
	}));
	// endregion Settings


	// region Actions
	private async authentication(): Promise<void> {
		await import('src/app/core/firebase/components/firebase-auth-dialog/firebase-auth-dialog.component')
			.then(module => this.dialogService.static(module.FirebaseAuthDialogComponent));
	}

	private async colorTheme(): Promise<void> {
		await import('src/app/core/colors/components/color-theme-dialog/color-theme-dialog.component')
			.then(module => this.dialogService.static(module.ColorThemeDialogComponent));
	}

	private async background(): Promise<void> {
		await import('src/app/features/background/components/background-dialog/background-dialog.component')
			.then(module => this.dialogService.static(module.BackgroundDialogComponent));
	}

	private async dyslexia(): Promise<void> {
		await import('src/app/features/dyslexia/components/dyslexia-dialog/dyslexia-dialog.component')
			.then(module => this.dialogService.static(module.DyslexiaDialogComponent));
	}
	// endregion Actions
}
