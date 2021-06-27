import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SnekGridNodeType } from 'src/app/pages/not-found/snek/models/grid/snek-grid-node-type.enum';
import { SnekGridNode } from 'src/app/pages/not-found/snek/models/grid/snek-grid-node.model';

@Component({
	selector: 'snek-grid-node',
	templateUrl: './snek-grid-node.component.html',
	styleUrls: [ './snek-grid-node.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnekGridNodeComponent {
	public readonly SnekGridNodeType = SnekGridNodeType;

	@Input() snekGridNode: SnekGridNode;

	constructor() {
	}
}
