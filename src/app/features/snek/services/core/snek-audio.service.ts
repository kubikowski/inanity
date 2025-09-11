import { effect, inject, Injectable, isDevMode } from '@angular/core';
import { SnekSoundEffect, SnekSoundEffectUtil } from 'src/app/features/snek/models/audio/snek-sound-effect.enum';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Injectable()
export class SnekAudioService {
	private readonly snekStateService = inject(SnekStateService);

	/**
	 * TODO: add a soundtrack while we're at it.
	 */
	private readonly soundEffects = this.initializeSoundEffects();

	public constructor() {
		effect(() => {
			const score = this.snekStateService.score();
			this.scoreEvent(score)
				.catch(console.error);
		});

		effect(() => {
			const gameOverMessage = this.snekStateService.gameOver();

			if (gameOverMessage !== null) {
				this.gameOverEvent(gameOverMessage)
					.catch(console.error);
			}
		});
	}

	private initializeSoundEffects(): ReadonlyMap<SnekSoundEffect, HTMLAudioElement> {
		const soundEffects = new Map<SnekSoundEffect, HTMLAudioElement>();

		console.info('Snek Audio is currently disabled for copyright purposes, until I can produce custom audio tracks for the game.');
		if (isDevMode()) {
			for (const snekSoundEffect of Object.values(SnekSoundEffect)) {
				soundEffects.set(snekSoundEffect, this.initializeSoundEffect(snekSoundEffect));
			}
		}

		return soundEffects;
	}

	/**
	 * TODO: there is a whole other world of web audio available
	 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
	 */
	private initializeSoundEffect(snekSoundEffect: SnekSoundEffect): HTMLAudioElement {
		const fileName = SnekSoundEffectUtil.getFileName(snekSoundEffect);
		const soundEffect = new Audio(`assets/audio/snek/${ fileName }.wav`);
		soundEffect.volume = 0.5;
		soundEffect.preload = 'auto';
		soundEffect.load();
		return soundEffect;
	}

	private async scoreEvent(score: number): Promise<void> {
		const snekSoundEffect = SnekSoundEffectUtil.getScoreEffect(score);

		if (snekSoundEffect !== null) {
			await this.playSoundEffect(snekSoundEffect);
		}
	}

	private async gameOverEvent(_gameOverMessage: string): Promise<void> {
		await this.playSoundEffect(SnekSoundEffect.GAME_OVER);
	}

	private async playSoundEffect(snekSoundEffect: SnekSoundEffect): Promise<void> {
		await this.soundEffects.get(snekSoundEffect)?.play();
	}
}
