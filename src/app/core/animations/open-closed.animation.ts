import { animate, group, state, style, transition, trigger } from '@angular/animations';

export enum OpenClosedAnimationState {
	OPEN = 'open',
	CLOSED = 'closed',
}

const { OPEN, CLOSED } = OpenClosedAnimationState;
export const OpenClosedAnimation = trigger('openClosed', [
	state(OPEN, style({
		overflow: 'hidden',
	})),
	state(CLOSED, style({
		'max-height': '0',
		overflow: 'hidden',
	})),
	transition(`${ OPEN } => ${ CLOSED }`, [ group([
		animate('0ms ease-in-out', style({
			'max-height': '*',
		})),
		animate('200ms ease-in-out', style({
			'max-height': '0',
		})),
	]) ]),
	transition(`${ CLOSED } => ${ OPEN }`, [ group([
		animate('0ms ease-in-out', style({
			'max-height': '0',
		})),
		animate('200ms ease-in-out', style({
			'max-height': '*',
		})),
	]) ]),
]);
