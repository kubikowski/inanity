import { IconFile } from './icon-file.enum';
import { IconId } from './icon-id.enum';

export class SVGIcon {
	private constructor(
		public readonly href: string,
		public readonly viewBox: string,
	) { }

	public static readonly Wheel = SVGIcon.from(IconFile.WHEEL, IconId.WHEEL, '0 0 793 756');
	public static readonly Gong = SVGIcon.from(IconFile.GONG, IconId.GONG, '0 0 200 200');

	private static from(fileName: IconFile, iconId: IconId, viewBox: string): SVGIcon {
		const href = `assets/svg/${fileName}#${iconId}`;
		return new SVGIcon(href, viewBox);
	}
}
