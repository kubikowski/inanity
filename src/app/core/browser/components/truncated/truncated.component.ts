import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'truncated',
	template: '<ng-content/>',
	styleUrl: './truncated.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: { '[class.truncated]': 'true' },
})
export class TruncatedComponent { }
