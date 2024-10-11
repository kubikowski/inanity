export enum SnekIcon {
	BODY_STRAIGHT = 'snek:snek-body-straight',
	BODY_TURNED = 'snek:snek-body-turned',
	HEAD_DEFAULT = 'snek:snek-head-default',
	HEAD_TONGUE = 'snek:snek-head-tongue',
	TAIL = 'snek:snek-tail',
}

export abstract class SnekIconUtil {
	public static location = 'snek/icon-pack';
	public static namespace = 'snek';
}
