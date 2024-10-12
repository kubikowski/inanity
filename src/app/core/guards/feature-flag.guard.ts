import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FeatureFlagGuard implements CanActivate, CanActivateChild {
	public constructor(
		private readonly router: Router,
	) { }

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		const hasFeatureFlag = (route.data?.['featureFlag'] as boolean | undefined) ?? false;

		return this.hasPermission(hasFeatureFlag, state.url);
	}

	public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		const hasFeatureFlag = (childRoute.data?.['featureFlag'] as boolean | undefined) ?? false;

		return this.hasPermission(hasFeatureFlag, state.url);
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
