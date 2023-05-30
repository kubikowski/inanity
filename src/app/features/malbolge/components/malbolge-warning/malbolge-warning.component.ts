import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';

@Component({
	selector: 'malbolge-warning',
	templateUrl: './malbolge-warning.component.html',
	styleUrls: [ './malbolge-warning.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MalbolgeWarningComponent {
	public readonly OniIcon = SvgIcon.ONI;
}
