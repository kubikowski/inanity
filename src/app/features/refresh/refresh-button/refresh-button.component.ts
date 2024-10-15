import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatTooltip } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { RefreshState } from 'src/app/features/refresh/enums/refresh-state.enum';
import { RefreshTooltipPipe } from 'src/app/features/refresh/pipes/refresh-tooltip.pipe';
import { RefreshIconComponent } from 'src/app/features/refresh/refresh-icon/refresh-icon.component';

@Component({
	selector: 'refresh-button',
	templateUrl: 'refresh-button.component.html',
	styleUrl: 'refresh-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatIconButton, MatTooltip,
		RefreshIconComponent, RefreshTooltipPipe,
	],
})
export class RefreshButtonComponent<T> {

	public readonly refresh$ = input.required<Observable<T>>();
	public readonly doRefresh = signal<null | undefined>(undefined);

	public readonly color = input<ThemePalette>();
	public readonly tooltip = input('');
	public readonly tooltipDisabled = input(false);

	/* time spent in DONE state (milliseconds) */
	public readonly debounceTime = input(10_000);

	public readonly refreshState = signal(RefreshState.IDLE);
	public readonly RefreshState = RefreshState;

	public handleClick(event: MouseEvent): void {
		event.stopPropagation();
		this.doRefresh.set(null);
	}
}
