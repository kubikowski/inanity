import { Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogConfiguration, DialogButtonConfiguration } from '../configuration/dialog-configuration.model';

export class DialogBuilder {
	private readonly configuration: DialogConfiguration = {
		header: {
			title: signal(''),
			tooltip: signal(''),
			centered: true,
		},
		content: {
			omitPadding: false,
			omitScrolling: false,
			contentCentered: false,
		},
		footer: {
			submitButton: {
				action: undefined,
				text: signal('Submit'),
				visible: signal(true),
				enabled: signal(true),
				attribute: 'flat',
				color: 'primary',
			},
			cancelButton: {
				action: undefined,
				text: signal('Cancel'),
				visible: signal(true),
				enabled: signal(true),
				attribute: 'stroked',
				color: 'neutral',
			},
			extraButtons: [ ],
		},
	};

	public static new(): DialogBuilder {
		return new DialogBuilder();
	}

	public build(): DialogConfiguration {
		return this.configuration;
	}

	// region Header
	public withHeaderTitle(title: string | Signal<string>): this {
		this.configuration.header.title = (typeof title === 'string') ? signal(title) : title;
		return this;
	}

	public withHeaderTooltip(tooltip: string | Signal<string>): this {
		this.configuration.header.tooltip = (typeof tooltip === 'string') ? signal(tooltip) : tooltip;
		return this;
	}
	// endregion Header


	// region Content
	public withContentPaddingOmitted(omitPadding = true): this {
		this.configuration.content.omitPadding = omitPadding;
		return this;
	}

	public withContentScrollingOmitted(omitScrolling = true): this {
		this.configuration.content.omitScrolling = omitScrolling;
		return this;
	}

	public withContentCentered(contentCentered = true): this {
		this.configuration.content.contentCentered = contentCentered;
		return this;
	}
	// endregion Content


	// region Submit Button
	public withSubmitAction(action: <T> () => Observable<T> | void): this {
		this.configuration.footer.submitButton.action = action;
		return this;
	}

	public withSubmitText(text: string | Signal<string>): this {
		this.configuration.footer.submitButton.text = (typeof text === 'string') ? signal(text) : text;
		return this;
	}

	public withSubmitIcon(icon: string | Signal<string>): this {
		this.configuration.footer.submitButton.icon = (typeof icon === 'string') ? signal(icon) : icon;
		return this;
	}

	public withSubmitIconFill(iconFill = true): this {
		this.configuration.footer.submitButton.iconFill = iconFill;
		return this;
	}

	public withSubmitIconAlignment(iconAlignment: 'left' | 'right'): this {
		this.configuration.footer.submitButton.iconAlignment = iconAlignment;
		return this;
	}

	public withSubmitVisible(visible: boolean | Signal<boolean> = true): this {
		this.configuration.footer.submitButton.visible = (typeof visible === 'boolean') ? signal(visible) : visible;
		return this;
	}

	public withSubmitEnabled(enabled: boolean | Signal<boolean> = true): this {
		this.configuration.footer.submitButton.enabled = (typeof enabled === 'boolean') ? signal(enabled) : enabled;
		return this;
	}
	// endregion Submit Button


	// region Cancel Button
	public withCancelAction(action: <T> () => Observable<T> | void): this {
		this.configuration.footer.cancelButton.action = action;
		return this;
	}

	public withCancelText(text: string | Signal<string>): this {
		this.configuration.footer.cancelButton.text = (typeof text === 'string') ? signal(text) : text;
		return this;
	}

	public withCancelIcon(icon: string | Signal<string>): this {
		this.configuration.footer.cancelButton.icon = (typeof icon === 'string') ? signal(icon) : icon;
		return this;
	}

	public withCancelIconFill(iconFill = true): this {
		this.configuration.footer.cancelButton.iconFill = iconFill;
		return this;
	}

	public withCancelIconAlignment(iconAlignment: 'left' | 'right'): this {
		this.configuration.footer.cancelButton.iconAlignment = iconAlignment;
		return this;
	}

	public withCancelVisible(visible: boolean | Signal<boolean> = true): this {
		this.configuration.footer.cancelButton.visible = (typeof visible === 'boolean') ? signal(visible) : visible;
		return this;
	}

	public withCancelEnabled(enabled: boolean | Signal<boolean> = true): this {
		this.configuration.footer.cancelButton.enabled = (typeof enabled === 'boolean') ? signal(enabled) : enabled;
		return this;
	}
	// endregion Cancel Button


	// region Extra Buttons
	public withExtraButton(extraButton: DialogButtonConfiguration): this {
		this.configuration.footer.extraButtons.push(extraButton);
		return this;
	}

	public withExtraButtons(extraButtons: DialogButtonConfiguration[]): this {
		this.configuration.footer.extraButtons.push(...extraButtons);
		return this;
	}
	// endregion Extra Buttons
}
