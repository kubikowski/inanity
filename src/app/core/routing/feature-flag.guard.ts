import { inject, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Data, GuardResult, RedirectCommand, Router, RouterStateSnapshot } from '@angular/router';

export abstract class FeatureFlagGuard {
	public static canActivate(): CanActivateFn {
		return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => this.hasPermission(route.data, state.url);
	}

	public static canActivateChild(): CanActivateChildFn {
		return (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => this.hasPermission(childRoute.data, state.url);
	}

	private static hasPermission(routeData: Data, url: string): GuardResult {
		const hasFeatureFlag = (routeData['featureFlag'] as boolean | undefined) ?? false;

		if (!hasFeatureFlag) {
			return true;
		} else {
			console.warn(`'${ url }' is still under construction 👷`);

			const defaultPath = inject(Router).parseUrl('/nope');
			const redirectCommand = new RedirectCommand(defaultPath);

			return isDevMode() || redirectCommand;
		}
	}
}
