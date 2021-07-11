import { ValueOf } from 'src/app/shared/types/value-of.type';

export const Sin = {
	ANGER: 'SINS_ANGER',
	ATTACHMENT: 'SINS_ATTACHMENT',
	DECEIT: 'SINS_DECEIT',
	DELUSION: 'SINS_DELUSION',
	EGO: 'SINS_EGO',
	ENVY: 'SINS_ENVY',
	FEAR: 'SINS_FEAR',
	GLUTTONY: 'SINS_GLUTTONY',
	GREED: 'SINS_GREED',
	LUST: 'SINS_LUST',
	PRIDE: 'SINS_PRIDE',
	SLOTH: 'SINS_SLOTH',
	WRATH: 'SINS_WRATH',
} as const;

export type Sin = ValueOf<typeof Sin>;

export const sins = Object.values(Sin);
