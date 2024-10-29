export enum SnekIcon {
	BODY_STRAIGHT = 'snek-body-straight',
	BODY_TURNED = 'snek-body-turned',
	BODY_TURNED_CLOCKWISE = 'snek-body-turned-clockwise',
	BODY_TURNED_COUNTERCLOCKWISE = 'snek-body-turned-counterclockwise',
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
