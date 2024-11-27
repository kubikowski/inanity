import { effect, inject, Injectable, isDevMode } from '@angular/core';
import { background } from 'src/app/core/functions/promise/background.function';
import { wait } from 'src/app/core/functions/promise/wait.function';
import { SnekAudio } from 'src/app/features/snek/models/audio/snek-audio.enum';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Injectable()
export class SnekAudioService {
	private readonly snekStateService = inject(SnekStateService);

	private readonly soundEffects = this.initializeSoundEffects();

	public constructor() {
		effect(async () => {
			const score = this.snekStateService.score();

			await background([
				this.scoreEvent(score),
				this.secondaryScoreEvent(score),
			]);
		});

		effect(async () => {
			const gameOverMessage = this.snekStateService.gameOver();

			await background([
				this.gameOverEvent(gameOverMessage),
			]);
		});
	}

	private initializeSoundEffects(): ReadonlyMap<SnekAudio, HTMLAudioElement> {
		const soundEffects = new Map<SnekAudio, HTMLAudioElement>();

		console.info('Snek Audio is currently disabled for copyright purposes, until I can produce custom audio tracks for the game.');

		for (const soundEffectName of isDevMode() ? Object.values(SnekAudio) : []) {
			const soundEffect = new Audio(`assets/audio/snek/${ soundEffectName }.wav`);
			soundEffects.set(soundEffectName, soundEffect);
			soundEffect.load();
		}

		return soundEffects;
	}

	private async scoreEvent(score: number): Promise<void> {
		const soundEffectName = this.getScoreEffectName(score);

		if (soundEffectName !== null) {
			await this.playSoundEffect(soundEffectName);
		}
	}

	private async secondaryScoreEvent(score: number): Promise<void> {
		const soundEffectName = this.getSecondaryScoreEffectName(score);

		if (soundEffectName !== null) {
			await wait(100);
			await this.playSoundEffect(soundEffectName);
		}
	}

	private getScoreEffectName(score: number): SnekAudio | null {
		if (score === 0) {
			return null;
		} else if (score % 100 === 0) {
			return SnekAudio.SCORE_XLARGE;
		} else if (score % 25 === 0) {
			return SnekAudio.SCORE_LARGE;
		} else {
			return SnekAudio.SCORE_XSMALL;
		}
	}

	private getSecondaryScoreEffectName(score: number): SnekAudio | null {
		if (score % 25 === 0) {
			return null;
		} else if (score % 10 === 0) {
			return SnekAudio.SCORE_MEDIUM;
		} else if (score % 5 === 0) {
			return SnekAudio.SCORE_SMALL;
		} else {
			return null;
		}
	}

	private async gameOverEvent(gameOverMessage: string | null): Promise<void> {
		if (gameOverMessage !== null) {
			await this.playSoundEffect(SnekAudio.GAME_OVER);
		}
	}

	private async playSoundEffect(soundEffectName: SnekAudio): Promise<void> {
		await this.soundEffects.get(soundEffectName)?.play();
	}
}
