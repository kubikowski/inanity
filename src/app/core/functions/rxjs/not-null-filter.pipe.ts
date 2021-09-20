import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function notNullFilter<T>(): MonoTypeOperatorFunction<T> {
	return filter<T>(value => value !== null);
}
