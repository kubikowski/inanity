import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';
import { SnekSolverService } from 'src/app/features/snek/services/peripheral/snek-solver.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'snek-options',
	templateUrl: './snek-options.component.html',
	styleUrls: [ './snek-options.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnekOptionsComponent {
	private readonly subscriptions = new SubSink();

	public readonly score$!: Observable<number>;
	public readonly highScore$!: Observable<number>;

	public solverEnabled: FormControl;

	public constructor(
		private readonly snekStateService: SnekStateService,
		private readonly snekSolverService: SnekSolverService,
	) {
		this.score$ = this.snekStateService.score$;
		this.highScore$ = this.snekStateService.highScore$;

		this.solverEnabled = this.initializeSolverEnabled();
	}

	private initializeSolverEnabled(): FormControl {
		const solverEnabled = new FormControl(this.snekSolverService.enabled);

		this.subscriptions.sink = this.snekSolverService.enabled$
			.pipe(distinctUntilChanged())
			.subscribe(enabled => solverEnabled.setValue(enabled));

		this.subscriptions.sink = solverEnabled.valueChanges
			.subscribe(enabled => this.snekSolverService.enabled = enabled);

		return solverEnabled;
	}
}
