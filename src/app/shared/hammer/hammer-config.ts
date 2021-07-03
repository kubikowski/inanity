import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';
import Hammer from 'hammerjs';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
	public readonly overrides = {
		swipe: {
			direction: Hammer.DIRECTION_ALL,
		},
	} as const;
}
