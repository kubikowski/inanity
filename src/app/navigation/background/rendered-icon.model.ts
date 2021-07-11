import { Sin, sins } from 'src/app/shared/svg/sin.enum';

export class RenderedIcon {
	private static idCounter = 0;

	private constructor(
		public readonly icon: Sin,
		public readonly position: number,
		public readonly id: number,
	) { }

	public static random(): RenderedIcon {
		const sin = sins[ Math.floor(Math.random() * sins.length) ];
		const position = Math.random() * 100;
		const id = ++RenderedIcon.idCounter;

		return new RenderedIcon(sin, position, id);
	}
}
