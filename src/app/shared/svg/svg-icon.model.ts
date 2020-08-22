export class SVGIcon {
	private constructor(
		public readonly href: string,
		public readonly viewBox: string,
	) { }

	public static from(fileName: string, iconId: string, viewBox: string): SVGIcon {
		const href = `assets/svg/${fileName}#${iconId}`;
		return new SVGIcon(href, viewBox);
	}
}
