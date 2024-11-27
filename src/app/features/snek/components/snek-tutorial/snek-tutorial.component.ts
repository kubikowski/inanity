import { Component, computed, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ScreenDisplay } from 'src/app/core/browser/models/screen-display.enum';
import { ScreenService } from 'src/app/core/browser/services/screen.service';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Component({
	selector: 'snek-tutorial',
	templateUrl: 'snek-tutorial.component.html',
	styleUrl: 'snek-tutorial.component.scss',
	standalone: true,
	imports: [ MatIcon ],
})
export class SnekTutorialComponent {
	private readonly snekStateService = inject(SnekStateService);
	private readonly screenService = inject(ScreenService);

	public readonly playing = this.snekStateService.playing;
	public readonly paused = this.snekStateService.paused;

	public readonly tutorialViewed = signal(false);
	public readonly isDesktopView = computed(() => this.screenService.screenDisplay() === ScreenDisplay.DESKTOP);

	public viewTutorial(): void {
		this.tutorialViewed.set(true);
	}
}
