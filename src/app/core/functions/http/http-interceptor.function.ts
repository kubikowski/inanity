import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { intercept } from 'src/app/core/functions/json/intercept.funtion';

export function interceptHttp(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const clonedRequest = request.clone({
		url: stripTrailingSlash(request.url),
		body: intercept(request.body),
	});

	return next(clonedRequest);
}

function stripTrailingSlash(url: string): string {
	const trailingSlashRegExp = /^(?<url>.+?)[/]*$/;
	return trailingSlashRegExp.exec(url)?.groups?.['url'] ?? url;
}
