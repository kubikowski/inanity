import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GongStatusUpdate } from 'src/app/pages/gong/models/gong-status-update.model';
import { SvgIcon } from 'src/app/shared/svg/svg-icon.enum';

@Component({
	selector: 'gong',
	templateUrl: './gong.component.html',
	styleUrls: [ './gong.component.scss', './../page.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GongComponent {
	public readonly StackIcon = SvgIcon.STACK;
	public readonly GongIcon = SvgIcon.GONG;

	public readonly statusUpdates: ReadonlyArray<GongStatusUpdate>;

	constructor() {
		this.statusUpdates = GongComponent.getStatusUpdates();
	}

	private static getStatusUpdates(): ReadonlyArray<GongStatusUpdate> {
		return [
			GongStatusUpdate.from(
				'New Gong',
				[ 'Ok so there is a gong. The gong is real.' ],
				new Date('05 Feb 2020 09:26:00'),
			),
			GongStatusUpdate.from(
				'New Servo',
				[ 'Bought a Nema-17 stepper motor to power the gong mallet, as well as an adafruit M4 and a motor hat' ],
				new Date('12 Jan 2019 10:57:19'),
			),
		];
	}
}
