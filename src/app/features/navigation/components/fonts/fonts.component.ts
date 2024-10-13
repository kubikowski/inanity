import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'fonts',
	templateUrl: 'fonts.component.html',
	styleUrl: 'fonts.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class FontsComponent { }
