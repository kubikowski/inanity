import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { GongStatusUpdate } from 'src/app/pages/gong/models/gong-status-update.model';

@Component({
	selector: 'gong-page',
	templateUrl: './gong-page.component.html',
	styleUrl: './gong-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		DatePipe, MatCardModule, MatIcon,
		DyslexicTextComponent,
	],
})
export class GongPageComponent {
	public readonly statusUpdates = GongPageComponent.getStatusUpdates();

	private static getStatusUpdates(): ReadonlyArray<GongStatusUpdate> {
		return [
			GongStatusUpdate.withImage(
				'Paiste Symphonic Gong',
				new Date('05 Feb 2020 09:26:00'),
				SvgIcon.GONG,
				[
					'Ok so there is a gong. The gong is real. It is a vintage Paiste symphonic gong from West Germany.',
					'In theory what we want to happen is that when you press a button here, it sends a message to an api. ' +
					'That will be routed through a messaging service, to a local arduino listener that will strike the gong.',
				],
				'https://images.reverb.com/image/upload/s--h6GEum9o--/f_auto,t_large/v1580782954/kxhgkqs4mfgopbbpg43b.jpg',
				'a picture of my actual gong',
			),
			GongStatusUpdate.from(
				'New Servo',
				new Date('12 Jan 2019 10:57:19'),
				SvgIcon.STACK,
				[
					'Bought a Nema-17 stepper motor to power the gong mallet, as well as an adafruit M4 and a motor hat.',
				],
			),
		];
	}
}
