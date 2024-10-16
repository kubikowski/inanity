import { SnekDirection, SnekDirectionUtil } from 'src/app/features/snek/models/direction/snek-direction.enum';

export enum SnekNodeType {
	HEAD = 'HEAD',
	BODY_STRAIGHT = 'BODY_STRAIGHT',
	BODY_TURNED = 'BODY_TURNED',
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
		} else {
			return SnekNodeType.BODY_TURNED;
		}
	}
}
