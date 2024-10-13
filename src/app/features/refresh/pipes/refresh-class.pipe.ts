import { Pipe, PipeTransform } from '@angular/core';
import { RefreshState, RefreshStateUtil } from 'src/app/features/refresh/enums/refresh-state.enum';

@Pipe({ name: 'refreshClass', standalone: true })
export class RefreshClassPipe implements PipeTransform {

	public transform(refreshState: RefreshState): string {
		return RefreshStateUtil.getClass(refreshState);
	}
}
