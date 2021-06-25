import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/snek-state.service';

@Component({
	selector: 'snek-options',
	templateUrl: './snek-options.component.html',
	styleUrls: [ './snek-options.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnekOptionsComponent {
	public readonly score$: Observable<number>;
	public readonly highScore$: Observable<number>;

	constructor(
		private snekStateService: SnekStateService,
	) {
		this.score$ = this.snekStateService.score$;
		this.highScore$ = this.snekStateService.highScore$;
	}
}
