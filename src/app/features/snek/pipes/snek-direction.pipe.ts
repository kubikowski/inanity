import { Pipe, PipeTransform } from '@angular/core';
import { SnekDirection, SnekDirectionUtil } from 'src/app/features/snek/models/direction/snek-direction.enum';

@Pipe({ name: 'snekDirection' })
export class SnekDirectionPipe implements PipeTransform {

	public transform(parentDirection: SnekDirection | null, childDirection: SnekDirection | null): SnekDirection | null {
		if (parentDirection === null) {
			return SnekDirectionUtil.inverse(childDirection);
		} else if (childDirection === null || parentDirection === SnekDirectionUtil.inverse(childDirection)) {
			return parentDirection;
		} else {
			return (SnekDirectionUtil.isRotatedRight(parentDirection, childDirection))
				? parentDirection
				: childDirection;
		}
	}
}
