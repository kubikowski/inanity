import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';

export class GongStatusUpdate {
	public constructor(
		public readonly title: string,
		public readonly date: Date,
		public readonly svgIcon: SvgIcon,
		public readonly paragraphs: ReadonlyArray<string>,
		public readonly imageUrl: string | null = null,
		public readonly imageAlt: string | null = null,
	) { }

	public static from(title: string, date: Date, svgIcon: SvgIcon, paragraphs: ReadonlyArray<string>): GongStatusUpdate {
		return new GongStatusUpdate(title, date, svgIcon, paragraphs);
	}

	public static withImage(title: string, date: Date, svgIcon: SvgIcon, paragraphs: ReadonlyArray<string>, imageUrl: string, imageAlt: string): GongStatusUpdate {
		return new GongStatusUpdate(title, date, svgIcon, paragraphs, imageUrl, imageAlt);
	}
}
