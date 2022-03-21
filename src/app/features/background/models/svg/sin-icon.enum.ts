export enum SinIcon {
	SINS_ANGER = 'SINS_ANGER',
	SINS_ATTACHMENT = 'SINS_ATTACHMENT',
	SINS_DECEIT = 'SINS_DECEIT',
	SINS_DELUSION = 'SINS_DELUSION',
	SINS_EGO = 'SINS_EGO',
	SINS_ENVY = 'SINS_ENVY',
	SINS_FEAR = 'SINS_FEAR',
	SINS_GLUTTONY = 'SINS_GLUTTONY',
	SINS_GREED = 'SINS_GREED',
	SINS_LUST = 'SINS_LUST',
	SINS_PRIDE = 'SINS_PRIDE',
	SINS_SLOTH = 'SINS_SLOTH',
	SINS_WRATH = 'SINS_WRATH',
}

export namespace SinIcon {
	export const all: ReadonlyArray<SinIcon> = [
		SinIcon.SINS_ANGER,
		SinIcon.SINS_ATTACHMENT,
		SinIcon.SINS_DECEIT,
		SinIcon.SINS_DELUSION,
		SinIcon.SINS_EGO,
		SinIcon.SINS_ENVY,
		SinIcon.SINS_FEAR,
		SinIcon.SINS_GLUTTONY,
		SinIcon.SINS_GREED,
		SinIcon.SINS_LUST,
		SinIcon.SINS_PRIDE,
		SinIcon.SINS_SLOTH,
		SinIcon.SINS_WRATH,
	] as const;

	export const registry: Record<SinIcon, string> = {
		[SinIcon.SINS_ANGER]: 'sins/anger',
		[SinIcon.SINS_ATTACHMENT]: 'sins/attachment',
		[SinIcon.SINS_DECEIT]: 'sins/deceit',
		[SinIcon.SINS_DELUSION]: 'sins/delusion',
		[SinIcon.SINS_EGO]: 'sins/ego',
		[SinIcon.SINS_ENVY]: 'sins/envy',
		[SinIcon.SINS_FEAR]: 'sins/fear',
		[SinIcon.SINS_GLUTTONY]: 'sins/gluttony',
		[SinIcon.SINS_GREED]: 'sins/greed',
		[SinIcon.SINS_LUST]: 'sins/lust',
		[SinIcon.SINS_PRIDE]: 'sins/pride',
		[SinIcon.SINS_SLOTH]: 'sins/sloth',
		[SinIcon.SINS_WRATH]: 'sins/wrath',
	}
}
