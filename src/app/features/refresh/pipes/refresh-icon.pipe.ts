import { Pipe, PipeTransform } from '@angular/core';
import { RefreshState, RefreshStateUtil } from 'src/app/features/refresh/enums/refresh-state.enum';

@Pipe({ name: 'refreshIcon', standalone: true })
export class RefreshIconPipe implements PipeTransform {

	public transform(refreshState: RefreshState): string {
		return RefreshStateUtil.getIcon(refreshState);
	}
}
