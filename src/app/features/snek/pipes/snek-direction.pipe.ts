import { Pipe } from '@angular/core';
import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';

@Pipe({ name: 'snekDirection' })
export class SnekDirectionPipe {

	public transform(parentDirection: SnekDirection | null, childDirection: SnekDirection | null): SnekDirection | null {
		if (parentDirection === null) {
			return SnekDirection.inverse(childDirection);
		} else if (childDirection === null || parentDirection === SnekDirection.inverse(childDirection)) {
			return parentDirection;
		} else {
			return (SnekDirection.isRotatedRight(parentDirection, childDirection))
				? parentDirection
				: childDirection;
		}
	}
}
