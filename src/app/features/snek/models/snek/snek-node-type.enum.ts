import { SnekDirection, SnekDirectionUtil } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekIcon } from 'src/app/features/snek/models/svg/snek-icon.enum';

export enum SnekNodeType {
	HEAD = 'HEAD',
	BODY_STRAIGHT = 'BODY_STRAIGHT',
	BODY_TURNED_CCW = 'BODY_TURNED_CCW',
	BODY_TURNED_CW = 'BODY_TURNED_CW',
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
			return SnekNodeType.BODY_TURNED_CW;
		} else {
			return SnekNodeType.BODY_TURNED_CCW;
		}
	}

	public static getIconOptions(snekNoteType: SnekNodeType | null, counter: number): SnekIcon[] {
		switch (snekNoteType) {
			case SnekNodeType.HEAD: {
				const evenTiming = (counter % 4) > 1;

				return (evenTiming)
					? [ SnekIcon.HEAD_DEFAULT ]
					: [ SnekIcon.HEAD_TONGUE, SnekIcon.HEAD_DEFAULT ];
			}
			case SnekNodeType.BODY_STRAIGHT:
				return [ SnekIcon.BODY_STRAIGHT ];
			case SnekNodeType.BODY_TURNED_CCW:
				return [ SnekIcon.BODY_TURNED_CCW, SnekIcon.BODY_TURNED ];
			case SnekNodeType.BODY_TURNED_CW:
				return [ SnekIcon.BODY_TURNED_CW, SnekIcon.BODY_TURNED ];
			case SnekNodeType.TAIL:
				return [ SnekIcon.TAIL ];
			default:
				throw new Error(`what type of snek is this: ${ snekNoteType }`);
		}
	}
}
