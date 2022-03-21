import { Pipe } from '@angular/core';
import { SnekNodeType } from 'src/app/features/snek/models/snek/snek-node-type.enum';
import { SnekIcon } from 'src/app/features/snek/models/svg/snek-icon.enum';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Pipe({ name: 'snekIcon' })
export class SnekIconPipe {

	public constructor(
		private readonly snekStateService: SnekStateService,
	) { }

	public transform(snekNoteType: SnekNodeType | null): SnekIcon {
		switch (snekNoteType) {
			case SnekNodeType.HEAD:
				return this.evenTiming
					? SnekIcon.SNEK_HEAD_DEFAULT
					: SnekIcon.SNEK_HEAD_TONGUE;
			case SnekNodeType.BODY_STRAIGHT:
				return SnekIcon.SNEK_BODY_STRAIGHT;
			case SnekNodeType.BODY_TURNED:
				return SnekIcon.SNEK_BODY_TURNED;
			case SnekNodeType.TAIL:
				return SnekIcon.SNEK_TAIL;
			default:
				throw new Error(`what type of snek is this: ${ snekNoteType }`);
		}
	}

	private get evenTiming(): boolean {
		const gameCounter = this.snekStateService.gameState?.gameCounter ?? 0;

		return (gameCounter % 4) > 1;
	}
}
