import { SnekDirection, SnekDirectionUtil } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekIcon } from 'src/app/features/snek/models/svg/snek-icon.enum';

export enum SnekNodeType {
	HEAD = 'HEAD',
	BODY_STRAIGHT = 'BODY_STRAIGHT',
	BODY_TURNED_CLOCKWISE = 'BODY_TURNED_CLOCKWISE',
	BODY_TURNED_COUNTERCLOCKWISE = 'BODY_TURNED_COUNTERCLOCKWISE',
	TAIL = 'TAIL',
}

export abstract class SnekNodeTypeUtil {
	public static from(parentDirection: SnekDirection | null, childDirection: SnekDirection | null): SnekNodeType {
		if (parentDirection === null) {
			return SnekNodeType.HEAD;
		} else if (childDirection === null) {
			return SnekNodeType.TAIL;
		} else if (parentDirection === SnekDirectionUtil.inverse(childDirection)) {
			return SnekNodeType.BODY_STRAIGHT;
		} else if (SnekDirectionUtil.isRotatedClockwise(parentDirection, childDirection)) {
			return SnekNodeType.BODY_TURNED_CLOCKWISE;
		} else {
			return SnekNodeType.BODY_TURNED_COUNTERCLOCKWISE;
		}
	}

	public static getIcon(snekNoteType: SnekNodeType | null, gameCounter: number): SnekIcon {
		switch (snekNoteType) {
			case SnekNodeType.HEAD: {
				const evenTiming = (gameCounter % 4) > 1;

				return (evenTiming)
					? SnekIcon.HEAD_DEFAULT
					: SnekIcon.HEAD_TONGUE;
			}
			case SnekNodeType.BODY_STRAIGHT:
				return SnekIcon.BODY_STRAIGHT;
			case SnekNodeType.BODY_TURNED_CLOCKWISE:
				return SnekIcon.BODY_TURNED_CLOCKWISE;
			case SnekNodeType.BODY_TURNED_COUNTERCLOCKWISE:
				return SnekIcon.BODY_TURNED_COUNTERCLOCKWISE;
			case SnekNodeType.TAIL:
				return SnekIcon.TAIL;
			default:
				throw new Error(`what type of snek is this: ${ snekNoteType }`);
		}
	}

	public static getFallbackIcon(snekNoteType: SnekNodeType | null): SnekIcon | null {
		switch (snekNoteType) {
			case SnekNodeType.HEAD:
				return SnekIcon.HEAD_DEFAULT;
			case SnekNodeType.BODY_TURNED_CLOCKWISE:
			case SnekNodeType.BODY_TURNED_COUNTERCLOCKWISE:
				return SnekIcon.BODY_TURNED;
			default:
				return null;
		}
	}
}
