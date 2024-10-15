import { computed, inject, Injectable } from '@angular/core';
import { ScreenDetectorService } from 'src/app/core/browser/screen-detector.service';

@Injectable()
export class SnekResolutionService {
	private readonly screenDetectorService = inject(ScreenDetectorService);

	private static readonly optimalSnekWidth = 35;
	private static readonly optimalSnekHeight = 25;

	public readonly snekWidth = computed(
		() => this.getSnekWidth(this.screenDetectorService.screenWidth()));

	public readonly snekHeight = computed(
		() => this.getSnekHeight(this.screenDetectorService.screenHeight()));

	public readonly resolution = computed<[ number, number ]>(
		() => [ this.snekWidth(), this.snekHeight() ]);


	private getSnekWidth(screenWidth: number): number {
		const screenDependentSnekWidth = Math.floor(screenWidth / 20) - 3;

		return Math.min(screenDependentSnekWidth, SnekResolutionService.optimalSnekWidth);
	}

	private getSnekHeight(screenHeight: number): number {
		const screenDependentSnekHeight = Math.floor(screenHeight / 20) - 12;

		return Math.min(screenDependentSnekHeight, SnekResolutionService.optimalSnekHeight);
	}
}
