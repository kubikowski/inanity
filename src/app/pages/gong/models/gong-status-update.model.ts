export class GongStatusUpdate {
	constructor(
		public readonly title: string,
		public readonly paragraphs: ReadonlyArray<string>,
		public readonly date: Date,
	) { }

	public static from(title: string, paragraphs: ReadonlyArray<string>, date: Date): GongStatusUpdate {
		return new GongStatusUpdate(title, paragraphs, date);
	}
}
