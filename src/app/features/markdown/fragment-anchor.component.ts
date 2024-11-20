import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'fragment-anchor',
	template: '<a mat-icon-button class="fragment-anchor" [href]="link"><mat-icon>double_arrow</mat-icon></a>',
	styleUrl: 'fragment-anchor.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ MatIcon, MatIconAnchor ],
})
export class FragmentAnchorComponent {
	/** at time of writing, createCustomElement does not handle signal inputs */
	@Input({ required: true }) public readonly link!: string;
}
