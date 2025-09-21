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
	submitButton: DialogButtonConfiguration;
	cancelButton: DialogButtonConfiguration;
	extraButtons: DialogButtonConfiguration[];
}

export interface DialogButtonConfiguration {
	action?: <T> () => (Observable<T> | void);
	text: Signal<string>;
	icon?: Signal<string>;
	iconFill?: boolean;
	iconAlignment?: 'left' | 'right';
	visible: Signal<boolean>;
	enabled: Signal<boolean>;
	attribute: 'flat' | 'stroked';
	alignment?: 'left' | 'right';
	color?: 'primary' | 'neutral';
}
