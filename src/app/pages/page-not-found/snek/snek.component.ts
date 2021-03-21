import { Component, OnInit } from '@angular/core';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { SnekGame } from 'src/app/pages/page-not-found/snek/models/snek-game.model';
import { SnekGridNodeType } from 'src/app/pages/page-not-found/snek/models/snek-grid-node-type.enum';
import { Observable } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';
import { SubSink } from 'subsink';

@Component({
	selector: 'snek',
	templateUrl: './snek.component.html',
	styleUrls: ['./snek.component.scss']
})
export class SnekComponent implements OnInit {
	private readonly subscriptions = new SubSink();

	@Observed() private snekGame: SnekGame = SnekGame.new(35, 25);
	public readonly snekGame$: Observable<SnekGame>;

	public readonly SnekGridNodeType = SnekGridNodeType;

	constructor() {
		this.subscriptions.sink = timer(200, 200)
			.subscribe(() => this.snekGame.snek.move());
	}

	ngOnInit(): void {
	}

}
