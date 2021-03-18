import { Component, OnInit } from '@angular/core';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { SnekGrid } from 'src/app/pages/page-not-found/snek/models/snek-grid.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'snek',
	templateUrl: './snek.component.html',
	styleUrls: ['./snek.component.scss']
})
export class SnekComponent implements OnInit {

	@Observed() private snekGrid: SnekGrid = SnekGrid.new(40, 25);
	public readonly snekGrid$: Observable<SnekGrid>;

	constructor() {
	}

	ngOnInit(): void {
	}

}
