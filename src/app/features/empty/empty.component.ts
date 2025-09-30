import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanInput } from 'src/app/core/functions/boolean/coerce-boolean-input.function';

@Component({
	selector: 'empty',
	templateUrl: 'empty.component.html',
	styleUrl: 'empty.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.empty]': 'true',
		'[class.opaque]': 'opaque()',
		'[class.omit-border]': 'omitBorder()',
		'[class.omit-padding]': 'omitPadding()',
	},
})
export class EmptyComponent {
	public readonly opaque = input(false, { transform: coerceBooleanInput });

	public readonly omitBorder = input(false, { transform: coerceBooleanInput });
	public readonly omitPadding = input(false, { transform: coerceBooleanInput });
}
