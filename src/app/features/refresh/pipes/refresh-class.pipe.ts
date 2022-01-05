import { Pipe, PipeTransform } from '@angular/core';
import { RefreshState } from 'src/app/features/refresh/enums/refresh-state.enum';

@Pipe({ name: 'refreshClass' })
export class RefreshClassPipe implements PipeTransform {

	public transform(refreshState: RefreshState): string {
		return RefreshState.getClass(refreshState);
	}
}
