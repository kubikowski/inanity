import { Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogFooterButtonConfiguration } from '../configuration/dialog-configuration.model';

export class DialogButtonBuilder {
	private readonly configuration: DialogFooterButtonConfiguration = {
		action: undefined,
		text: signal(''),
		attribute: 'stroked',
		alignment: 'left',
		color: 'neutral',
	};

	public static new(): DialogButtonBuilder {
		return new DialogButtonBuilder();
	}

	public build(): DialogFooterButtonConfiguration {
		return this.configuration;
	}

	public withAction(action: <T> () => (Observable<T> | void)): this {
		this.configuration.action = action;
		return this;
	}

	public withText(text: string | Signal<string>): this {
		this.configuration.text = (typeof text === 'string') ? signal(text) : text;
		return this;
	}

	public withIcon(icon: string | Signal<string>): this {
		this.configuration.icon = (typeof icon === 'string') ? signal(icon) : icon;
		return this;
	}

	public withIconFill(iconFill = true): this {
		this.configuration.iconFill = iconFill;
		return this;
	}

	public withHidden(hidden: boolean | Signal<boolean> = true): this {
		this.configuration.hidden = (typeof hidden === 'boolean') ? signal(hidden) : hidden;
		return this;
	}

	public withDisabled(disabled: boolean | Signal<boolean> = true): this {
		this.configuration.disabled = (typeof disabled === 'boolean') ? signal(disabled) : disabled;
		return this;
	}

	public withAttribute(attribute: 'flat' | 'stroked'): this {
		this.configuration.attribute = attribute;
		return this;
	}

	public withAlignment(alignment: 'left' | 'right'): this {
		this.configuration.alignment = alignment;
		return this;
	}

	public withColor(color: 'primary' | 'neutral'): this {
		this.configuration.color = color;
		return this;
	}
}
