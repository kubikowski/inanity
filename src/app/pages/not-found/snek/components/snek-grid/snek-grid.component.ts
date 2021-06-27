import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SnekGame } from 'src/app/pages/not-found/snek/models/state/snek-game.model';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/core/snek-state.service';

@Component({
	selector: 'snek-grid',
	templateUrl: './snek-grid.component.html',
	styleUrls: [ './snek-grid.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnekGridComponent {
	public readonly snekGame$: Observable<SnekGame>;

	constructor(
		private readonly snekStateService: SnekStateService,
	) {
		this.snekGame$ = this.snekStateService.snekGame$;
	}
}
