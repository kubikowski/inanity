import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';
import { sins } from 'src/app/features/background/models/svg/sins.constant';

export class MovingBackgroundIcon {
	private static idCounter = 0;

	private constructor(
		public readonly icon: SvgIcon,
		public readonly position: number,
		public readonly id: number,
	) { }

	public static random(): MovingBackgroundIcon {
		const icon = sins[ Math.floor(Math.random() * sins.length) ] as SvgIcon;
		const position = Math.random() * 100;
		const id = MovingBackgroundIcon.idCounter++;

		return new MovingBackgroundIcon(icon, position, id);
	}
}
