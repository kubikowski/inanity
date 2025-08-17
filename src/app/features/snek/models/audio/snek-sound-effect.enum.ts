export enum SnekSoundEffect {
	SCORE_XXS = 'SCORE_XXS',
	SCORE_XS = 'SCORE_XS',
	SCORE_S = 'SCORE_S',
	SCORE_M = 'SCORE_M',
	SCORE_L = 'SCORE_L',
	SCORE_XL = 'SCORE_XL',
	GAME_OVER = 'GAME_OVER',
}

export abstract class SnekSoundEffectUtil {
	public static getScoreEffect(score: number): SnekSoundEffect | null {
		if (score === 0) {
			return null;
		} else if (score % 50 === 0) {
			return SnekSoundEffect.SCORE_XL;
		} else if (score % 25 === 0) {
			return SnekSoundEffect.SCORE_L;
		} else if (score % 10 === 0) {
			return SnekSoundEffect.SCORE_M;
		} else if (score % 5 === 0) {
			return SnekSoundEffect.SCORE_S;
		} else if (score % 2 === 0) {
			return SnekSoundEffect.SCORE_XS;
		} else {
			return SnekSoundEffect.SCORE_XXS;
		}
	}

	public static getFileName(snekSoundEffect: SnekSoundEffect): string {
		switch (snekSoundEffect) {
			case SnekSoundEffect.SCORE_XXS:
				return 'dsitemup';
			case SnekSoundEffect.SCORE_XS:
				return 'dspunch';
			case SnekSoundEffect.SCORE_S:
				return 'dsslop';
			case SnekSoundEffect.SCORE_M:
				return 'dsgetpow';
			case SnekSoundEffect.SCORE_L:
				return 'dstelept';
			case SnekSoundEffect.SCORE_XL:
				return 'dsspidth';
			case SnekSoundEffect.GAME_OVER:
				return 'dsnoway';
		}
	}
}
