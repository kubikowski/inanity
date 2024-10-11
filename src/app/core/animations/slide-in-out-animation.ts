/* eslint-disable @typescript-eslint/naming-convention */

import { animate, group, state, style, transition, trigger } from '@angular/animations';

export enum SlideInOutAnimationState {
	IN = 'in',
	OUT = 'out',
}

export const SlideInOutAnimation = [
	trigger('slideInOut', [
		state('in', style({
			overflow: 'hidden',
		})),
		state('out', style({
			'max-height': '0px',
			overflow: 'hidden',
		})),
		transition('in => out', [ group([
			animate('0ms ease-in-out', style({
				'max-height': '1000px',
			})),
			animate('300ms ease-in-out', style({
				'max-height': '0px',
			})),
		]) ]),
		transition('out => in', [ group([
			animate('0ms ease-in-out', style({
				'max-height': '0px',
			})),
			animate('300ms ease-in-out', style({
				'max-height': '1000px',
			})),
		]) ]),
	]),
];
