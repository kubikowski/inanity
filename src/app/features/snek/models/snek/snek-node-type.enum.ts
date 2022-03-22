import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';

export enum SnekNodeType {
	HEAD = 'HEAD',
	BODY_STRAIGHT = 'BODY_STRAIGHT',
	BODY_TURNED = 'BODY_TURNED',
	TAIL = 'TAIL',
}

export namespace SnekNodeType {
	export function from(parentDirection: SnekDirection, childDirection: SnekDirection): SnekNodeType {
		if (parentDirection === null) {
			return SnekNodeType.HEAD;
		} else if (childDirection === null) {
			return SnekNodeType.TAIL;
		} else if (parentDirection === SnekDirection.inverse(childDirection)) {
			return SnekNodeType.BODY_STRAIGHT;
		} else {
			return SnekNodeType.BODY_TURNED;
		}
	}
}
