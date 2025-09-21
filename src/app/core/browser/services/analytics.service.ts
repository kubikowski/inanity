/* eslint-disable @typescript-eslint/naming-convention */
import { effect, inject, Injectable } from '@angular/core';
import { gtag, install } from 'ga-gtag';
import { RouterService } from 'src/app/core/browser/services/router.service';
import { timeout } from 'src/app/core/functions/promise/timeout.function';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
	private readonly routerService = inject(RouterService);
	private readonly measurementId = environment.firebaseConfig.measurementId as string;

	public constructor() {
		install(this.measurementId);

		effect(() => this.tagPageEvents());
	}

	private tagPageEvents(): void {
		this.debounceCurrentUrl()
			.then(currentUrl => gtag('config', this.measurementId, {
				'page_path': currentUrl,
			}))
			.catch(console.error);
	}

	private async debounceCurrentUrl(): Promise<string> {
		const currentUrl = this.routerService.currentUrl();
		await timeout();
		return currentUrl;
	}
}
