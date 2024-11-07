import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'background-image',
	template: '<ng-content/>',
	styleUrl: 'background-image.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	host: {
		'[class]': 'clip()',
		'[class.background-image]': 'true',
		'[style.background-image]': '\'url(\' + url() + \')\'',
		'[style.min-height]': 'height() + \'px\'',
		'[title]': 'alt() ?? \'\'',
	},
})
export class BackgroundImageComponent {

	/** Image Source URL */
	public readonly url = input.required<string>();

	/** Image Alternate Text */
	public readonly alt = input<string>();

	/** Scroll Height */
	public readonly height = input.required<number>();

	/** Whether to clip the image */
	public readonly clip = input<'parallelogram' | 'wave'>();
}
