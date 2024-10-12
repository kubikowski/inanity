import { Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogConfiguration } from '../configuration/dialog-configuration.model';

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
				attribute: 'flat',
				color: 'primary',
			},
			cancelButton: {
				action: undefined,
				text: signal('Cancel'),
				attribute: 'stroked',
			},
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
	public withSubmitButtonAction(action: <T> () => Observable<T> | void): this {
		this.configuration.footer.submitButton.action = action;
		return this;
	}

	public withSubmitButtonText(text: string | Signal<string>): this {
		this.configuration.footer.submitButton.text = (typeof text === 'string') ? signal(text) : text;
		return this;
	}

	public withSubmitButtonIcon(icon: string | Signal<string>): this {
		this.configuration.footer.submitButton.icon = (typeof icon === 'string') ? signal(icon) : icon;
		return this;
	}

	public withSubmitButtonIconFill(iconFill = true): this {
		this.configuration.footer.submitButton.iconFill = iconFill;
		return this;
	}

	public withSubmitButtonHidden(hidden: boolean | Signal<boolean> = true): this {
		this.configuration.footer.submitButton.hidden = (typeof hidden === 'boolean') ? signal(hidden) : hidden;
		return this;
	}

	public withSubmitButtonDisabled(disabled: boolean | Signal<boolean> = true): this {
		this.configuration.footer.submitButton.disabled = (typeof disabled === 'boolean') ? signal(disabled) : disabled;
		return this;
	}
	// endregion Submit Button


	// region Cancel Button
	public withCancelButtonAction(action: <T> () => Observable<T> | void): this {
		this.configuration.footer.cancelButton.action = action;
		return this;
	}

	public withCancelButtonText(text: string | Signal<string>): this {
		this.configuration.footer.cancelButton.text = (typeof text === 'string') ? signal(text) : text;
		return this;
	}

	public withCancelButtonIcon(icon: string | Signal<string>): this {
		this.configuration.footer.cancelButton.icon = (typeof icon === 'string') ? signal(icon) : icon;
		return this;
	}

	public withCancelButtonIconFill(iconFill = true): this {
		this.configuration.footer.cancelButton.iconFill = iconFill;
		return this;
	}

	public withCancelButtonHidden(hidden: boolean | Signal<boolean> = true): this {
		this.configuration.footer.cancelButton.hidden = (typeof hidden === 'boolean') ? signal(hidden) : hidden;
		return this;
	}

	public withCancelButtonDisabled(disabled: boolean | Signal<boolean> = true): this {
		this.configuration.footer.cancelButton.disabled = (typeof disabled === 'boolean') ? signal(disabled) : disabled;
		return this;
	}
	// endregion Cancel Button
}
