import { Pipe, PipeTransform } from '@angular/core';
import { RefreshState } from 'src/app/features/refresh/enums/refresh-state.enum';

@Pipe({ name: 'refreshIcon' })
export class RefreshIconPipe implements PipeTransform {

	public transform(refreshState: RefreshState): string {
		return RefreshState.getIcon(refreshState);
	}
}
