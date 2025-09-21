import { Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogButtonConfiguration } from '../configuration/dialog-configuration.model';

export class DialogButtonBuilder {
	private readonly configuration: DialogButtonConfiguration = {
		action: undefined,
		text: signal(''),
		visible: signal(true),
		enabled: signal(true),
		attribute: 'stroked',
		alignment: 'left',
		color: 'neutral',
	};

	public static new(): DialogButtonBuilder {
		return new DialogButtonBuilder();
	}

	public build(): DialogButtonConfiguration {
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

	public withVisible(visible: boolean | Signal<boolean> = true): this {
		this.configuration.visible = (typeof visible === 'boolean') ? signal(visible) : visible;
		return this;
	}

	public withDisabled(disabled: boolean | Signal<boolean> = true): this {
		this.configuration.enabled = (typeof disabled === 'boolean') ? signal(disabled) : disabled;
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
