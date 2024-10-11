import { Pipe, PipeTransform } from '@angular/core';
import { RefreshState, RefreshStateUtil } from 'src/app/features/refresh/enums/refresh-state.enum';

@Pipe({ name: 'refreshTooltip' })
export class RefreshTooltipPipe implements PipeTransform {

	public transform(refreshState: RefreshState, tooltip: string): string {
		return RefreshStateUtil.getTooltip(refreshState, tooltip);
	}
}
