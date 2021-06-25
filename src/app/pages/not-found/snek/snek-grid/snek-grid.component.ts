import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SnekGame } from 'src/app/pages/not-found/snek/models/snek-game.model';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/snek-state.service';

@Component({
	selector: 'snek-grid',
	templateUrl: './snek-grid.component.html',
	styleUrls: [ './snek-grid.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnekGridComponent {
	public readonly snekGame$: Observable<SnekGame>;

	constructor(
		private snekStateService: SnekStateService,
	) {
		this.snekGame$ = this.snekStateService.snekGame$;
	}
}
