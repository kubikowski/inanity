import { animate, group, style, transition, trigger } from '@angular/animations';

export const SlideInOutAnimation = trigger('slideInOut', [
	transition(':enter', [ group([
		animate('0ms ease-out', style({
			transform: 'translateX(100%)',
		})),
		animate('250ms ease-out', style({
			transform: 'translateX(0)',
		})),
	]) ]),
	transition(':leave', [ group([
		animate('0ms ease-in', style({
			transform: 'translateX(0)',
		})),
		animate('250ms ease-in', style({
			transform: 'translateX(100%)',
		})),
	]) ]),
]);
