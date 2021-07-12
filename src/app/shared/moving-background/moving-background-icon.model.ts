import { sins } from 'src/app/shared/moving-background/sin.constant';
import { SvgIcon } from 'src/app/shared/svg/svg-icon.enum';

export class MovingBackgroundIcon {
	private static idCounter = 0;

	private constructor(
		public readonly icon: SvgIcon,
		public readonly position: number,
		public readonly id: number,
	) { }

	public static random(): MovingBackgroundIcon {
		const icon = sins[ Math.floor(Math.random() * sins.length) ];
		const position = Math.random() * 100;
		const id = MovingBackgroundIcon.idCounter++;

		return new MovingBackgroundIcon(icon, position, id);
	}
}
