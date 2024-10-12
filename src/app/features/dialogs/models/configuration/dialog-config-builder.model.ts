import { MatDialogConfig } from '@angular/material/dialog';

type SizeOption = 'sm' | 'md' | 'lg';

interface DialogInput {
	[ key: string ]: unknown;
}

export class DialogConfigBuilder<Data = unknown> {
	private readonly config: MatDialogConfig<Data>;

	private constructor(
		data: Data = {} as Data,
		sizeOption: SizeOption = 'md',
	) {
		this.config = new MatDialogConfig<Data>();
		this.config.data = data;
		this.config.position = {
			top: '65px',
		};

		if (sizeOption !== null) {
			this.config.width = DialogConfigBuilder.getWidth(sizeOption);
			this.config.maxWidth = DialogConfigBuilder.getMaxWidth(sizeOption);
		}
	}

	public build(): MatDialogConfig<Data> {
		return this.config;
	}

	public static default<Data = DialogInput>(data: Data = {} as Data): DialogConfigBuilder<Data> {
		return this.medium(data);
	}

	public static small<Data = DialogInput>(data: Data = {} as Data): DialogConfigBuilder<Data> {
		return new DialogConfigBuilder(data, 'sm');
	}

	public static medium<Data = DialogInput>(data: Data = {} as Data): DialogConfigBuilder<Data> {
		return new DialogConfigBuilder(data, 'md');
	}

	public static large<Data = DialogInput>(data: Data = {} as Data): DialogConfigBuilder<Data> {
		return new DialogConfigBuilder(data, 'lg');
	}

	/** Disables focusing the first tabbable element of the dialog. */
	public withoutAutoFocus(): DialogConfigBuilder<Data> {
		this.config.autoFocus = false;
		return this;
	}

	private static getWidth(size: SizeOption): string {
		const maxWidth = DialogConfigBuilder.getMaxWidth(size);
		return `min(${ maxWidth }, 100% - 3rem)`;
	}

	private static getMaxWidth(size: SizeOption): string {
		switch (size) {
			case 'sm':
				return '300px';
			case 'md':
				return '500px';
			case 'lg':
				return '800px';
		}
	}
}
