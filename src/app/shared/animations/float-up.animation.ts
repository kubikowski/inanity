import { animate, group, state, style, transition, trigger } from '@angular/animations';

export enum FloatUpAnimationState {
	FLOATING = 'floating',
}

export const FloatUpAnimation = [
	trigger('floatUp', [
		state('void', style({
			position: 'absolute',
		})),
		state('floating', style({
			position: 'absolute',
		})),
		transition(':enter', [ group([
			animate('0ms ease-in-out', style({
				position: 'absolute',
				bottom: '0px',
				width: '4rem',
				height: '4rem',
				transform: 'rotate(0)',
			})),
			animate('24s ease-in-out', style({
				position: 'absolute',
				bottom: '100%',
				width: '1rem',
				height: '1rem',
				transform: 'rotate(-360deg)',
			})),
		])]),
	]),
];
