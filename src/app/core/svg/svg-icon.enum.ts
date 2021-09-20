import { ExternalSvgIcon } from 'src/app/core/svg/external-svg-icon.enum';
import { InternalSvgIcon } from 'src/app/core/svg/internal-svg-icon.enum';

export type SvgIcon = keyof typeof InternalSvgIcon | keyof typeof ExternalSvgIcon;
type SvgIconEnum = { [ key in SvgIcon ]: key };

const svgIcons = { ...InternalSvgIcon, ...ExternalSvgIcon } as const;
const svgIconEntries = Object.keys(svgIcons)
	.map(key => [ key, key ]);

export const SvgIcon = Object.fromEntries(svgIconEntries) as SvgIconEnum;
