export enum SinIcon {
	ANGER = 'ANGER',
	ATTACHMENT = 'ATTACHMENT',
	DECEIT = 'DECEIT',
	DELUSION = 'DELUSION',
	EGO = 'EGO',
	ENVY = 'ENVY',
	FEAR = 'FEAR',
	GLUTTONY = 'GLUTTONY',
	GREED = 'GREED',
	LUST = 'LUST',
	PRIDE = 'PRIDE',
	SLOTH = 'SLOTH',
	WRATH = 'WRATH',
}

export abstract class SinIconUtil {
	public static readonly namespace = 'sin';

	public static readonly all = [
		SinIcon.ANGER,
		SinIcon.ATTACHMENT,
		SinIcon.DECEIT,
		SinIcon.DELUSION,
		SinIcon.EGO,
		SinIcon.ENVY,
		SinIcon.FEAR,
		SinIcon.GLUTTONY,
		SinIcon.GREED,
		SinIcon.LUST,
		SinIcon.PRIDE,
		SinIcon.SLOTH,
		SinIcon.WRATH,
	] as const;

	public static readonly registry: Record<SinIcon, string> = {
		[SinIcon.ANGER]: 'sins/anger',
		[SinIcon.ATTACHMENT]: 'sins/attachment',
		[SinIcon.DECEIT]: 'sins/deceit',
		[SinIcon.DELUSION]: 'sins/delusion',
		[SinIcon.EGO]: 'sins/ego',
		[SinIcon.ENVY]: 'sins/envy',
		[SinIcon.FEAR]: 'sins/fear',
		[SinIcon.GLUTTONY]: 'sins/gluttony',
		[SinIcon.GREED]: 'sins/greed',
		[SinIcon.LUST]: 'sins/lust',
		[SinIcon.PRIDE]: 'sins/pride',
		[SinIcon.SLOTH]: 'sins/sloth',
		[SinIcon.WRATH]: 'sins/wrath',
	};
}
