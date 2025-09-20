import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { ImageSrcset } from 'src/app/core/functions/http/image-srcset.function';

/**
 * TODO: further reading on implementing parallax background image scrolling
 *  https://keithclark.co.uk/articles/practical-css-parallax/
 */
@Component({
	selector: 'background-image',
	template: '<ng-content/>',
	styleUrl: 'background-image.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class]': 'clip()',
		'[class.background-image]': 'true',
		'[style.background-image]': 'imageSet()',
		'[style.min-height]': 'scrollHeight() + \'px\'',
		'[title]': 'alt() ?? \'\'',
	},
})
export class BackgroundImageComponent {

	/** Image Source URL */
	public readonly url = input.required<string>();

	/** Image Alternate Text */
	public readonly alt = input<string>();

	/** Image Native Width */
	public readonly imgWidth = input.required<number>();
	public readonly imageSet = computed(() => ImageSrcset.getImageSet(this.url(), this.imgWidth()));

	/** Scroll Height */
	public readonly scrollHeight = input.required<number>();

	/** Whether to clip the image */
	public readonly clip = input<'parallelogram' | 'wave'>();
}
