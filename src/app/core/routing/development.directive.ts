import { Directive, inject, isDevMode, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * `*development` Directive
 *
 * A structural directive that allows an element to be rendered if production mode is not enabled.
 *
 * @example
 * <div *development>...</div>
 */
@Directive({ selector: '[development]', standalone: true })
export class DevelopmentDirective<T> {
	private readonly templateRef = inject(TemplateRef<T>);
	private readonly viewContainer = inject(ViewContainerRef);

	public constructor() {
		if (isDevMode()) {
			this.viewContainer.createEmbeddedView(this.templateRef);
		}
	}
}
