import { ExternalSvgIcon } from 'src/app/shared/svg/external-svg-icon.enum';
import { InternalSvgIcon } from 'src/app/shared/svg/internal-svg-icon.enum';

type SvgIconKey = keyof typeof InternalSvgIcon | keyof typeof ExternalSvgIcon;
type SvgIcon = { [ key in SvgIconKey]: key };

const svgIcons = { ...InternalSvgIcon, ...ExternalSvgIcon } as const;
const svgIconEntries = Object.keys(svgIcons)
	.map(key => [ key, key ]);

export const SvgIcon = Object.fromEntries(svgIconEntries) as SvgIcon;
