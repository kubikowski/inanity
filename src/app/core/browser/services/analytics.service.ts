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

		effect(() => {
			const currentUrl = this.routerService.currentUrl();
			this.tagPageEvent(currentUrl)
				.catch(console.error);
		});
	}

	private async tagPageEvent(currentUrl: string): Promise<void> {
		await timeout();
		gtag('config', this.measurementId, {
			'page_path': currentUrl,
		});
	}
}
