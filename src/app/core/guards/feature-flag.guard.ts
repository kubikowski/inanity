import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FeatureFlagGuard implements CanActivate, CanActivateChild, CanLoad {
	constructor(
		private readonly router: Router,
	) { }

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		const hasFeatureFlag: boolean = route.data?.featureFlag ?? false;

		return this.hasPermission(hasFeatureFlag, state.url);
	}

	public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		const hasFeatureFlag: boolean = childRoute.data?.featureFlag ?? false;

		return this.hasPermission(hasFeatureFlag, state.url);
	}

	public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
		const hasFeatureFlag: boolean = route.data?.featureFlag ?? false;
		const url = segments.map(segment => segment.path).join('/');

		return this.hasPermission(hasFeatureFlag, url);
	}

	private hasPermission(hasFeatureFlag: boolean, url: string): Observable<boolean> {
		return FeatureFlagGuard.hasPermission(hasFeatureFlag, url)
			.pipe(tap(hasPermission => {
				if (!hasPermission) this.router.navigate([ '/gottem' ]);
			}));
	}

	private static hasPermission(hasFeatureFlag: boolean, url: string): Observable<boolean> {
		if (hasFeatureFlag) {
			console.warn(`'${ url }' is still under construction 👷`);

			return of(isDevMode());
		}

		return of(true);
	}
}
