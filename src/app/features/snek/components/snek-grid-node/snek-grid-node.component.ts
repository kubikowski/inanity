import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SnekGridNodeType } from 'src/app/features/snek/models/grid/snek-grid-node-type.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';

@Component({
	selector: 'snek-grid-node',
	templateUrl: './snek-grid-node.component.html',
	styleUrls: [ './snek-grid-node.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnekGridNodeComponent implements OnInit {
	public readonly SnekGridNodeType = SnekGridNodeType;

	@Input() public snekGridNode!: SnekGridNode;

	public ngOnInit(): void {
		if (typeof this.snekGridNode === 'undefined') {
			throw new Error('missing input: snekGridNode');
		}
	}
}
