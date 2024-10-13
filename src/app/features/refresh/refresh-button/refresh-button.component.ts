import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatTooltip } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { Observed } from 'rxjs-observed-decorator';
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
		AsyncPipe, MatIconButton, MatTooltip,
		RefreshIconComponent, RefreshTooltipPipe,
	],
})
export class RefreshButtonComponent<T> implements OnInit {
	public readonly RefreshState = RefreshState;

	@Input() public refresh$!: Observable<T>;

	@Input() public color: ThemePalette;

	@Input() public tooltip = '';
	@Input() public tooltipDisabled = false;

	/* time spent in DONE state (milliseconds) */
	@Input() public debounceTime = 10_000;

	@Observed('subject') private doRefresh?: null;
	@Observed() public refreshState = RefreshState.IDLE;

	public readonly doRefresh$!: Observable<void>;
	public readonly refreshState$!: Observable<RefreshState>;

	public ngOnInit(): void {
		if (!(this.refresh$ instanceof Observable)) {
			console.error('missing input: refreshAction$');
		}
	}

	public handleClick(event: MouseEvent): void {
		event.stopPropagation();
		this.doRefresh = null;
	}
}
