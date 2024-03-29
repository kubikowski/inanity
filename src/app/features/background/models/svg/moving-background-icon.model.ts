import { SinIcon } from 'src/app/features/background/models/svg/sin-icon.enum';

export class MovingBackgroundIcon {
	private static idCounter = 0;

	private constructor(
		public readonly icon: SinIcon,
		public readonly position: number,
		public readonly id: number,
	) { }

	public static random(): MovingBackgroundIcon {
		const icon = SinIcon.all[ Math.floor(Math.random() * SinIcon.all.length) ] as SinIcon;
		const position = Math.random() * 100;
		const id = MovingBackgroundIcon.idCounter++;

		return new MovingBackgroundIcon(icon, position, id);
	}
}
