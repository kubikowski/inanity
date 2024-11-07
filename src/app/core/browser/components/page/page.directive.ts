import { Directive, HostBinding } from '@angular/core';

@Directive()
export class Page {
	@HostBinding('class.page') private readonly pageClass = true;
}
