import { Signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface DialogConfiguration {
	header: DialogHeaderConfiguration;
	content: DialogContentConfiguration;
	footer: DialogFooterConfiguration;
}

export interface DialogHeaderConfiguration {
	title: Signal<string>;
	tooltip: Signal<string>;
	centered: boolean;
}

export interface DialogContentConfiguration {
	omitPadding: boolean;
	omitScrolling: boolean;
	contentCentered: boolean;
}

export interface DialogFooterConfiguration {
	submitButton: DialogFooterButtonConfiguration;
	cancelButton: DialogFooterButtonConfiguration;
}

export interface DialogFooterButtonConfiguration {
	action?: <T> () => Observable<T> | void;
	text: Signal<string>;
	icon?: Signal<string>;
	hidden?: Signal<boolean>;
	disabled?: Signal<boolean>;
	attribute: 'flat' | 'stroked';
	color?: 'primary' | 'accent' | 'warn';
	iconFill?: boolean;
}
