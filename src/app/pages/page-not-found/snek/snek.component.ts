import { Component, OnInit } from '@angular/core';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { Snek } from 'src/app/pages/page-not-found/snek/models/snek.model';
import { SnekGrid } from 'src/app/pages/page-not-found/snek/models/snek-grid.model';
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

	@Observed() private snekGrid: SnekGrid = SnekGrid.new(35, 25);
	public readonly snekGrid$: Observable<SnekGrid>;

	public readonly SnekGridNodeType = SnekGridNodeType;

	constructor() {
		this.subscriptions.sink = timer(200, 200)
			.subscribe(() => this.snekGrid.snek.move());
	}

	ngOnInit(): void {
	}

}
