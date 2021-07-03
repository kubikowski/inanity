import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
	public readonly overrides = {
		swipe: { direction: Hammer.DIRECTION_ALL },
	} as const;
}
