import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable } from '@angular/core';
import { ScreenService } from 'src/app/core/browser/services/screen.service';

@Injectable()
export class SnekResolutionService {
	private readonly screenService = inject(ScreenService);
	private readonly body = inject(DOCUMENT).body;

	private static readonly optimalSnekWidth = 35;
	private static readonly optimalSnekHeight = 25;

	public readonly snekWidth = computed(
		() => this.getSnekWidth(this.screenService.screenWidth()));

	public readonly snekHeight = computed(
		() => this.getSnekHeight(this.screenService.screenHeight()));

	public readonly resolution = computed<[ number, number ]>(
		() => [ this.snekWidth(), this.snekHeight() ]);


	private getSnekWidth(screenWidth: number): number {
		const screenDependentSnekWidth = Math.floor(screenWidth / 20) - 3;

		return Math.min(screenDependentSnekWidth, SnekResolutionService.optimalSnekWidth);
	}

	private getSnekHeight(screenHeight: number): number {
		const navigationHeight = this.getNavigationHeight();
		const screenDependentSnekHeight = Math.floor((screenHeight - navigationHeight) / 20) - 5;

		return Math.min(screenDependentSnekHeight, SnekResolutionService.optimalSnekHeight);
	}

	private getNavigationHeight(): number {
		const style = window.getComputedStyle(this.body);
		const navigationHeight = style.getPropertyValue('--navigation-height');

		return +navigationHeight.replace('px', '');
	}
}
