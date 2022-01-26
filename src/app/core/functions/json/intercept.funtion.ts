/**
 * Intercepts a requestBody to correctly serialize Sets and Maps
 *
 * ES Sets and Maps do not serialize to JSON correctly and there is
 * no long term plan in ES to support their correct serialization.
 *
 * Maps and, _because Sets are implemented as Maps_, Sets are not currently defined
 * to support native JSON serialization. Unlike ES Objects, which are limited in key types
 * string, number, and Symbol, Maps can have any types of keys, including Object.
 *
 * And you cannot serialize an Object as a Object key in JSON.
 *
 * So the default behavior is that all Sets serialize as [].
 * And all maps serialize as {}.
 *
 * This method intercepts before serialization so that Sets serialize as Arrays.
 * And Maps serialize as Objects, as long as their keys are numbers or strings.
 *
 * @param requestBody a valid request body, or null if there is none provided.
 */
export function intercept(requestBody: unknown | null): unknown | null {

	if (requestBody instanceof Array || requestBody instanceof Set) {
		const requestBodyClone = <(unknown | null)[]>[];

		requestBody.forEach(value => {
			requestBodyClone.push(intercept(value));
		});

		return requestBodyClone;
	}

	if (requestBody instanceof Map) {
		const requestBodyClone = <{ [key: number | string]: unknown | null }>{};

		requestBody.forEach((value, key) => {
			switch (typeof key) {
				case 'number':
				case 'string':
					requestBodyClone[key] = intercept(value);
			}
		});

		return requestBodyClone;
	}

	if (requestBody instanceof Object) {
		const entries = Object.entries(requestBody) as [ number | string, unknown | null ][];

		if (entries.length > 0) {
			const requestBodyClone = <{ [key: number | string]: unknown | null }>{};

			entries.forEach(([ key, value ]) => {
				requestBodyClone[key] = intercept(value);
			});

			return requestBodyClone;
		}
	}

	return requestBody;
}
