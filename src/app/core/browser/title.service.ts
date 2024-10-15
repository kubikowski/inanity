import { inject, Injectable, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class TitleService implements OnDestroy {
	private readonly title = inject(Title);
	private readonly router = inject(Router);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly subscriptions = new SubSink();

	private static readonly DEFAULT_TITLE = 'inanity';

	public constructor() {
		this.handleTitleChanges();
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private handleTitleChanges(): void {
		this.subscriptions.sink = this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				map(() => this.getRouteTitle()),
				distinctUntilChanged(),
			).subscribe(routeTitle => this.title.setTitle(routeTitle));
	}

	private getRouteTitle(): string {
		let route = this.activatedRoute;
		let title = TitleService.DEFAULT_TITLE;

		while (route.firstChild !== null) {
			const parentRoute = route;
			route = route.firstChild;

			const parentRouteTitle = (parentRoute.snapshot.data?.['title'] ?? null) as string | null;
			const routeTitle = (route.snapshot.data?.['title'] ?? null) as string | null;

			if (routeTitle && parentRouteTitle !== routeTitle) {
				title = `${ routeTitle } · ${ title }`;
			}
		}

		return title;
	}
}
