import { computed, inject, Injectable, isDevMode } from '@angular/core';
import { ColorThemeDialogComponent } from 'src/app/core/colors/components/color-theme-dialog/color-theme-dialog.component';
import { FirebaseAuthDialogComponent } from 'src/app/core/firebase/components/firebase-auth-dialog/firebase-auth-dialog.component';
import { BackgroundDialogComponent } from 'src/app/features/background/components/background-dialog/background-dialog.component';
import { DialogService } from 'src/app/features/dialogs/services/dialog.service';
import { DyslexiaDialogComponent } from 'src/app/features/dyslexia/components/dyslexia-dialog/dyslexia-dialog.component';
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
	private authentication(): void {
		this.dialogService.static(FirebaseAuthDialogComponent);
	}

	private colorTheme(): void {
		this.dialogService.static(ColorThemeDialogComponent);
	}

	private background(): void {
		this.dialogService.static(BackgroundDialogComponent);
	}

	private dyslexia(): void {
		this.dialogService.static(DyslexiaDialogComponent);
	}
	// endregion Actions
}
