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
			animate('0ms linear', style({
				bottom: '-2rem',
				width: '2rem',
				height: '2rem',
				transform: 'rotate(0)',
			})),
			animate('30s linear', style({
				bottom: '100%',
				width: '1rem',
				height: '1rem',
				transform: 'rotate(-360deg)',
			})),
		])]),
	]),
];
