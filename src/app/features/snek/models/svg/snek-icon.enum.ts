export enum SnekIcon {
	SNEK_BODY_STRAIGHT = 'SNEK_BODY_STRAIGHT',
	SNEK_BODY_TURNED = 'SNEK_BODY_TURNED',
	SNEK_HEAD_DEFAULT = 'SNEK_HEAD_DEFAULT',
	SNEK_HEAD_TONGUE = 'SNEK_HEAD_TONGUE',
	SNEK_TAIL = 'SNEK_TAIL',
}

export namespace SnekIcon {
	export const all: ReadonlyArray<SnekIcon> = [
		SnekIcon.SNEK_BODY_STRAIGHT,
		SnekIcon.SNEK_BODY_TURNED,
		SnekIcon.SNEK_HEAD_DEFAULT,
		SnekIcon.SNEK_HEAD_TONGUE,
		SnekIcon.SNEK_TAIL,
	] as const;

	export const registry: Record<SnekIcon, string> = {
		[SnekIcon.SNEK_BODY_STRAIGHT]: 'snek/snek_body_straight',
		[SnekIcon.SNEK_BODY_TURNED]: 'snek/snek_body_turned',
		[SnekIcon.SNEK_HEAD_DEFAULT]: 'snek/snek_head_default',
		[SnekIcon.SNEK_HEAD_TONGUE]: 'snek/snek_head_tongue',
		[SnekIcon.SNEK_TAIL]: 'snek/snek_tail',
	}
}
