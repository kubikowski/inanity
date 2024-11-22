import { animate, group, style, transition, trigger } from '@angular/animations';

export const SlideUpAnimation = trigger('slideUp', [
	transition(':enter', [ group([
		animate('0ms ease-out', style({
			transform: 'translateY(100%)',
		})),
		animate('100ms ease-out', style({
			transform: 'translateY(0)',
		})),
	]) ]),
	transition(':leave', [ group([
		animate('0ms ease-in', style({
			transform: 'translateY(0)',
		})),
		animate('100ms ease-in', style({
			transform: 'translateY(-100%)',
		})),
	]) ]),
]);
