import { HttpInterceptorFn } from '@angular/common/http';
import { interceptHttp } from 'src/app/core/functions/http/http-interceptor.function';

export function provideHttpInterceptor(): HttpInterceptorFn {
	return interceptHttp;
}
