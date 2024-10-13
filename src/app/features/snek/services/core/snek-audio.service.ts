import { Injectable, OnDestroy } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { SnekAudio } from 'src/app/features/snek/models/audio/snek-audio.enum';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';
import { SubSink } from 'subsink';

@Injectable()
export class SnekAudioService implements OnDestroy {
	private readonly subscriptions = new SubSink();

	private readonly soundEffects = this.initializeSoundEffects();

	public constructor(
		private readonly snekStateService: SnekStateService,
	) {
		this.initializeScoreEvents();
		this.initializeGameOverEvents();
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private initializeSoundEffects(): ReadonlyMap<SnekAudio, HTMLAudioElement> {
		const soundEffects = new Map<SnekAudio, HTMLAudioElement>();

		console.info('Snek Audio is currently disabled for copyright purposes, until I can produce custom audio tracks for the game.');

		// for (const soundEffectName of Object.values(SnekAudio)) {
		// 	const soundEffect = new Audio(`assets/audio/snek/${ soundEffectName }.wav`);
		// 	soundEffects.set(soundEffectName, soundEffect);
		// 	soundEffect.load();
		// }

		return soundEffects;
	}

	private initializeScoreEvents(): void {
		this.subscriptions.sink = this.snekStateService.score$
			.pipe(
				filter(score => score !== 0),
				map(score => score % 10 === 0 ? SnekAudio.SCORE_MEDIUM : SnekAudio.SCORE_SMALL),
			).subscribe(soundEffectName => this.playSoundEffect(soundEffectName));
	}

	private initializeGameOverEvents(): void {
		this.subscriptions.sink = this.snekStateService.gameOver$
			.subscribe(() => this.playSoundEffect(SnekAudio.GAME_OVER));
	}

	private async playSoundEffect(soundEffectName: SnekAudio): Promise<void> {
		await this.soundEffects.get(soundEffectName)?.play();
	}
}
