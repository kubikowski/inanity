import { effect, inject, Injectable } from '@angular/core';
import { SnekAudio } from 'src/app/features/snek/models/audio/snek-audio.enum';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Injectable()
export class SnekAudioService {
	private readonly snekStateService = inject(SnekStateService);

	private readonly soundEffects = this.initializeSoundEffects();

	public constructor() {
		effect(async () => {
			const score = this.snekStateService.score();
			await this.scoreEvent(score);
		});

		effect(async () => {
			const gameOverMessage = this.snekStateService.gameOver();

			if (gameOverMessage !== null) {
				await this.gameOverEvent(gameOverMessage);
			}
		});
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

	private async scoreEvent(score: number): Promise<void> {
		if (score !== 0) {
			const soundEffectName = (score % 10 === 0)
				? SnekAudio.SCORE_MEDIUM : SnekAudio.SCORE_SMALL;

			await this.playSoundEffect(soundEffectName);
		}
	}

	private async gameOverEvent(_gameOverMessage: string): Promise<void> {
		await this.playSoundEffect(SnekAudio.GAME_OVER);
	}

	private async playSoundEffect(soundEffectName: SnekAudio): Promise<void> {
		await this.soundEffects.get(soundEffectName)?.play();
	}
}
