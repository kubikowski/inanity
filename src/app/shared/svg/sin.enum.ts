import { SvgIcon } from 'src/app/shared/svg/svg-icon.enum';
import { ValueOf } from 'src/app/shared/types/value-of.type';

const Sin = {
	ANGER: SvgIcon.SINS_ANGER,
	ATTACHMENT: SvgIcon.SINS_ATTACHMENT,
	DECEIT: SvgIcon.SINS_DECEIT,
	DELUSION: SvgIcon.SINS_DELUSION,
	EGO: SvgIcon.SINS_EGO,
	ENVY: SvgIcon.SINS_ENVY,
	FEAR: SvgIcon.SINS_FEAR,
	GLUTTONY: SvgIcon.SINS_GLUTTONY,
	GREED: SvgIcon.SINS_GREED,
	LUST: SvgIcon.SINS_LUST,
	PRIDE: SvgIcon.SINS_PRIDE,
	SLOTH: SvgIcon.SINS_SLOTH,
	WRATH: SvgIcon.SINS_WRATH,
} as const;

export type Sin = ValueOf<typeof Sin>;
export const sins = Object.values(Sin);
