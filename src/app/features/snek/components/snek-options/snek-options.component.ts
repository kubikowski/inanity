import { ChangeDetectionStrategy, Component, computed, inject, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTooltip } from '@angular/material/tooltip';
import { formValue } from 'src/app/core/functions/rxjs/form-value.function';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';
import { SnekSolverService } from 'src/app/features/snek/services/peripheral/snek-solver.service';

@Component({
	selector: 'snek-options',
	templateUrl: 'snek-options.component.html',
	styleUrl: 'snek-options.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatIcon, MatSlideToggle, ReactiveFormsModule, MatTooltip,
	],
})
export class SnekOptionsComponent {
	private readonly snekStateService = inject(SnekStateService);
	private readonly snekSolverService = inject(SnekSolverService);

	public readonly score = computed(() => SnekOptionsComponent.formatScore(this.snekStateService.score()));
	public readonly highScore = computed(() => SnekOptionsComponent.formatScore(this.snekStateService.highScore()));

	public readonly solverEnabledControl = new FormControl<boolean>(untracked(this.snekSolverService.enabled), { nonNullable: true });
	private readonly solverEnabled = toSignal(formValue(this.solverEnabledControl));

	public toggleSolverEnabled(): void {
		const enabled = untracked(this.solverEnabled);

		if (typeof enabled !== 'undefined') {
			this.snekSolverService.enabled.set(enabled);
		}
	}

	private static formatScore(score: number): string {
		return score.toString().padStart(3, '0');
	}
}
