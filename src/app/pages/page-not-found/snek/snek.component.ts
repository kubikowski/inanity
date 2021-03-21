import {Component, HostListener, OnInit} from '@angular/core';
import {Observed} from 'src/app/shared/decorators/observed.decorator';
import {SnekGame} from 'src/app/pages/page-not-found/snek/models/snek-game.model';
import {SnekGridNodeType} from 'src/app/pages/page-not-found/snek/models/snek-grid-node-type.enum';
import {Observable} from 'rxjs';
import {timer} from 'rxjs/internal/observable/timer';
import {SubSink} from 'subsink';
import {SnekDirection} from './models/snek-direction.enum';

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
		this.subscriptions.sink = timer(150, 150)
			.subscribe(() => this.snekGame.snek.move());
	}

	@HostListener('document:keydown', [ '$event' ])
	private keyDown(keyboardEvent: KeyboardEvent): void {
		switch (keyboardEvent.key) {
			case 'w':
			case 'ArrowUp':
				this.snekGame.snek.direction = SnekDirection.UP;
				break;
			case 's':
			case 'ArrowDown':
				this.snekGame.snek.direction = SnekDirection.DOWN;
				break;
			case 'a':
			case 'ArrowLeft':
				this.snekGame.snek.direction = SnekDirection.LEFT;
				break;
			case 'd':
			case 'ArrowRight':
				this.snekGame.snek.direction = SnekDirection.RIGHT;
				break;
		}
	}

	ngOnInit(): void {
	}

}
