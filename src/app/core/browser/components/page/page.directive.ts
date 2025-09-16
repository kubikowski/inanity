import { Directive } from '@angular/core';

@Directive({
	host: { '[class.page]': 'true' },
})
export class Page { }
