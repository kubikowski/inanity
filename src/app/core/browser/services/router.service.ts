import { inject, Injectable, OnDestroy, signal, untracked } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class RouterService implements OnDestroy {
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);
	private readonly subscriptions = new SubSink();

	/** occurs immediately when routing begins */
	readonly #currentlyNavigating = signal(false);
	public readonly currentlyNavigating = this.#currentlyNavigating.asReadonly();


	/**
	 * The URL is only the URL, it contains no query params.
	 * These update whenever the page is rerouted.
	 */
	readonly #previousUrl = signal<string>('');
	public readonly previousUrl = this.#previousUrl.asReadonly();

	readonly #currentUrl = signal<string>(RouterService.parseUrl(this.router.url));
	public readonly currentUrl = this.#currentUrl.asReadonly();


	/**
	 * The Fragment is just a page fragment.
	 * These update whenever the fragment is updated.
	 */
	readonly #previousFragment = signal<string>('');
	public readonly previousFragment = this.#previousFragment.asReadonly();

	readonly #currentFragment = signal<string>(RouterService.parseFragment(this.router.url));
	public readonly currentFragment = this.#currentFragment.asReadonly();


	/**
	 * The Query Params are in map form.
	 * These update whenever the queryParams change.
	 */
	readonly #previousQueryParams = signal<Params>({ });
	public readonly previousQueryParams = this.#previousQueryParams.asReadonly();

	readonly #currentQueryParams = signal<Params>(this.route.snapshot.queryParams);
	public readonly currentQueryParams = this.#currentQueryParams.asReadonly();


	public constructor() {
		this.listenForNavigationEvents();
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private listenForNavigationEvents(): void {
		// TODO: migrate to router.currentNavigation signals
		this.subscriptions.sink = this.router.events
			.pipe(
				tap(event => {
					if (event instanceof NavigationStart) {
						this.#currentlyNavigating.set(true);
					}
				}),
				filter(event => event instanceof NavigationEnd),
				tap(event => {
					this.#previousQueryParams.set(untracked(this.#currentQueryParams));
					this.#currentQueryParams.set(this.route.snapshot.queryParams);

					this.#previousFragment.set(untracked(this.#currentFragment));
					this.#currentFragment.set(RouterService.parseFragment(event.url));

					this.#currentlyNavigating.set(false);
				}),
				map(event => RouterService.parseUrl(event.url)),
				filter(url => url !== untracked(this.#currentUrl)),
			).subscribe(url => {
				this.#previousUrl.set(untracked(this.#currentUrl));
				this.#currentUrl.set(url);
			});
	}

	private static parseUrl(rawUrl: string): string {
		return rawUrl.split(/[#?]/)[0] ?? '';
	}

	private static parseFragment(rawUrl: string): string {
		return (rawUrl.split('?')[0] ?? '').split('#')[1] ?? '';
	}
}
