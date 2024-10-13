import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { distinctUntilChanged } from 'rxjs/operators';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';
import { SnekSolverService } from 'src/app/features/snek/services/peripheral/snek-solver.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'snek-options',
	templateUrl: 'snek-options.component.html',
	styleUrl: 'snek-options.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		AsyncPipe, MatIcon, MatSlideToggle, ReactiveFormsModule,
	],
})
export class SnekOptionsComponent {
	private readonly snekStateService = inject(SnekStateService);
	private readonly snekSolverService = inject(SnekSolverService);
	private readonly subscriptions = new SubSink();

	public readonly score$ = this.snekStateService.score$;
	public readonly highScore$ = this.snekStateService.highScore$;

	public solverEnabled: FormControl<boolean>;

	public constructor() {
		this.solverEnabled = this.initializeSolverEnabled();
	}

	private initializeSolverEnabled(): FormControl<boolean> {
		const solverEnabled = new FormControl<boolean>(this.snekSolverService.enabled, { nonNullable: true });

		this.subscriptions.sink = this.snekSolverService.enabled$
			.pipe(distinctUntilChanged())
			.subscribe(enabled => solverEnabled.setValue(enabled));

		this.subscriptions.sink = solverEnabled.valueChanges
			.subscribe(enabled => this.snekSolverService.enabled = enabled);

		return solverEnabled;
	}
}
