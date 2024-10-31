export enum SnekIcon {
	BODY_STRAIGHT = 'snek-body-straight',
	BODY_TURNED = 'snek-body-turned',
	BODY_TURNED_CCW = 'snek-body-turned-ccw',
	BODY_TURNED_CW = 'snek-body-turned-cw',
	FOOD = 'snek-food',
	HEAD_DEFAULT = 'snek-head-default',
	HEAD_TONGUE = 'snek-head-tongue',
	TAIL = 'snek-tail',
}

export enum SnekIconPack {
	SMOOTH = 'smooth',
	DOTTED = 'dotted',
	DRAGON = 'dragon',
}

export abstract class SnekIconUtil {
	public static getLocation(snekIconPack: SnekIconPack): string {
		return `snek/${ snekIconPack }/${ snekIconPack }-snek-icon-pack`;
	}

	public static getNamespace(snekIconPack: SnekIconPack): string {
		return `snek-${ snekIconPack }`;
	}
}
