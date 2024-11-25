import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable } from '@angular/core';
import { ScreenOrientation } from 'src/app/core/browser/models/screen-orientation.enum';
import { ScreenService } from 'src/app/core/browser/services/screen.service';
import { clamp } from 'src/app/core/functions/number/clamp.function';

@Injectable()
export class SnekResolutionService {
	private readonly screenService = inject(ScreenService);
	private readonly body = inject(DOCUMENT).body;

	private static readonly optimalSnekWidth = 35;
	private static readonly optimalSnekHeight = 25;
	private static readonly optimalSnekGridSize = 20;

	public readonly snekGridSize = computed(() => this.getSnekGridSize());
	public readonly resolution = computed(() => this.getSnekResolution());

	public readonly snekWidth = computed(() => this.getSnekWidth());
	public readonly snekHeight = computed(() => this.getSnekHeight());

	private getSnekWidth(): number {
		const [ snekWidth ] = this.resolution();
		return snekWidth;
	}

	private getSnekHeight(): number {
		const [ , snekHeight ] = this.resolution();
		return snekHeight;
	}

	private getSnekResolution(): [ number, number ] {
		const screenWidth = this.screenService.screenWidth();
		const screenHeight = this.screenService.screenHeight() - this.getNavigationHeight();
		const snekGridSize = this.snekGridSize();

		const screenDependentSnekWidth = Math.floor(screenWidth / snekGridSize) - 3;
		const screenDependentSnekHeight = Math.floor(screenHeight / snekGridSize) - 5;

		const [ optimalSnekWidth, optimalSnekHeight ] = this.getOptimalSnekResolution();
		const snekWidth = Math.min(screenDependentSnekWidth, optimalSnekWidth);
		const snekHeight = Math.min(screenDependentSnekHeight, optimalSnekHeight);

		return [ snekWidth, snekHeight ];
	}

	private getSnekGridSize(): number {
		const screenWidth = this.screenService.screenWidth();
		const screenHeight = this.screenService.screenHeight() - this.getNavigationHeight();

		const [ optimalScreenWidth, optimalScreenHeight ] = this.getOptimalScreenResolution();

		const optimalWidthScale = (screenWidth < optimalScreenWidth)
			? Math.floor((screenWidth / optimalScreenWidth) * SnekResolutionService.optimalSnekGridSize)
			: SnekResolutionService.optimalSnekWidth;

		const optimalHeightScale = (screenHeight < optimalScreenHeight)
			? Math.floor((screenHeight / optimalScreenHeight) * SnekResolutionService.optimalSnekGridSize)
			: SnekResolutionService.optimalSnekWidth;

		const optimalGridSize = Math.min(optimalWidthScale, optimalHeightScale);

		const pixelDensity = this.screenService.pixelDensity();
		const limitedPixelDensity = Math.max(pixelDensity / 2, 1);
		const minimumGridSize = Math.ceil(SnekResolutionService.optimalSnekGridSize / limitedPixelDensity);

		return clamp(minimumGridSize, optimalGridSize, SnekResolutionService.optimalSnekGridSize);
	}

	private getOptimalScreenResolution(): [ number, number ] {
		const [ optimalSnekWidth, optimalSnekHeight ] = this.getOptimalSnekResolution();
		const optimalScreenWidth = (optimalSnekWidth + 3) * SnekResolutionService.optimalSnekGridSize;
		const optimalScreenHeight = (optimalSnekHeight + 5) * SnekResolutionService.optimalSnekGridSize;

		return [ optimalScreenWidth, optimalScreenHeight ];
	}

	private getOptimalSnekResolution(): [ number, number ] {
		switch (this.screenService.screenOrientation()) {
			case ScreenOrientation.LANDSCAPE:
				return [ SnekResolutionService.optimalSnekWidth, SnekResolutionService.optimalSnekHeight ];
			case ScreenOrientation.PORTRAIT:
				return [ SnekResolutionService.optimalSnekHeight, SnekResolutionService.optimalSnekWidth ];
		}
	}

	private getNavigationHeight(): number {
		const style = window.getComputedStyle(this.body);
		const navigationHeight = style.getPropertyValue('--navigation-height');

		return +navigationHeight.replace('px', '');
	}
}
