import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SnekGridNodeType } from 'src/app/features/snek/models/grid/snek-grid-node-type.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { SnekIconPipe } from 'src/app/features/snek/pipes/snek-icon.pipe';

@Component({
	selector: 'snek-grid-node',
	templateUrl: 'snek-grid-node.component.html',
	styleUrl: 'snek-grid-node.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		AsyncPipe, MatIcon,
		SnekIconPipe,
	],
})
export class SnekGridNodeComponent {
	public readonly snekGridNode = input.required<SnekGridNode>();

	public readonly SnekGridNodeType = SnekGridNodeType;
}
