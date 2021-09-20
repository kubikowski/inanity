import { Injectable, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class TitleService implements OnDestroy {
	private readonly subscriptions = new SubSink();
	private readonly DEFAULT_TITLE = 'inanity';

	constructor(
		private readonly title: Title,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
	) {
		this.handleTitleChanges();
	}

	ngOnDestroy(): void {
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
		let title = this.DEFAULT_TITLE;

		while (route.firstChild !== null) {
			const parentRoute = route;
			route = route.firstChild;

			const parentRouteTitle = parentRoute.snapshot.data?.title;
			const routeTitle = route.snapshot.data?.title;

			if (routeTitle && parentRouteTitle !== routeTitle) {
				title = `${ routeTitle } · ${ title }`;
			}
		}

		return title;
	}
}
