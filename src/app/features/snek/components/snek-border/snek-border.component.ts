import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Component({
	selector: 'snek-border',
	templateUrl: 'snek-border.component.html',
	styleUrl: 'snek-border.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ MatTooltip ],
})
export class SnekBorderComponent {
	private readonly snekStateService = inject(SnekStateService);

	public readonly snekSeed = computed(() => this.getSnekSeed());

	private getSnekSeed(): string {
		return `#${ this.snekStateService.snekGame().seed.toString(16).padStart(4, '0') }`;
	}
}
