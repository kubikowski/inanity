import { Directive, isDevMode, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * `*development` Directive
 *
 * A structural directive that allows an element to be rendered if production mode is not enabled.
 *
 * @example
 * <div *development>...</div>
 */
@Directive({ selector: '[development]' })
export class DevelopmentDirective<T> {

	public constructor(
		private readonly templateRef: TemplateRef<T>,
		private readonly viewContainer: ViewContainerRef,
	) {
		if (isDevMode()) {
			this.viewContainer.createEmbeddedView(this.templateRef);
		}
	}
}
