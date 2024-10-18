import { effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TitleService {
	private readonly title = inject(Title);
	private readonly router = inject(Router);
	private readonly activatedRoute = inject(ActivatedRoute);

	private static readonly DEFAULT_TITLE = 'inanity';

	private readonly routeTitle = toSignal(this.router.events.pipe(
		filter(event => event instanceof NavigationEnd),
		map(() => this.getRouteTitle()),
	));

	public constructor() {
		effect(() => {
			const routeTitle = this.routeTitle();

			if (typeof routeTitle !== 'undefined') {
				this.title.setTitle(routeTitle);
			}
		});
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
