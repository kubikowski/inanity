import { computed, effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TitleService {
	private readonly meta = inject(Meta);
	private readonly title = inject(Title);
	private readonly router = inject(Router);
	private readonly activatedRoute = inject(ActivatedRoute);

	private static readonly DEFAULT_TITLE = 'inanity';

	private readonly route = toSignal(this.router.events.pipe(
		filter(event => event instanceof NavigationEnd),
		map(() => this.activatedRoute.snapshot),
	));

	private readonly routeTitle = computed(() => this.getRouteTitle());
	private readonly routeDescription = computed(() => this.getRouteDescription());

	public constructor() {
		effect(() => this.title.setTitle(this.routeTitle()));
		effect(() => this.meta.updateTag({
			name: 'description',
			content: this.routeDescription(),
		}));
	}

	private getRouteTitle(): string {
		let route = this.route() ?? null;
		let title = TitleService.DEFAULT_TITLE;

		while (route !== null && route.firstChild !== null) {
			const parentRoute = route;
			route = route.firstChild;

			const parentRouteTitle = (parentRoute.data?.['title'] ?? null) as string | null;
			const routeTitle = (route.data?.['title'] ?? null) as string | null;

			if (routeTitle && parentRouteTitle !== routeTitle) {
				title = `${ routeTitle } · ${ title }`;
			}
		}

		return title;
	}

	private getRouteDescription(): string {
		let route = this.route() ?? null;

		while (route !== null && route.firstChild !== null) {
			route = route.firstChild;
		}

		return (route?.data?.['description'] ?? '') as string;
	}
}
