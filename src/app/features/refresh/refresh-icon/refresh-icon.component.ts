import { ChangeDetectionStrategy, Component, computed, effect, inject, input, OnDestroy, output, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ThemePalette } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { delay, Observable, PartialObserver } from 'rxjs';
import { map } from 'rxjs/operators';
import { allowWrites } from 'src/app/core/functions/signal/allow-writes.constant';
import { RefreshState, RefreshStateUtil } from 'src/app/features/refresh/enums/refresh-state.enum';
import { RefreshClassPipe } from 'src/app/features/refresh/pipes/refresh-class.pipe';
import { RefreshIconPipe } from 'src/app/features/refresh/pipes/refresh-icon.pipe';
import { SubSink } from 'subsink';

@Component({
	selector: 'refresh-icon',
	templateUrl: './refresh-icon.component.html',
	styleUrl: './refresh-icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ MatIcon, RefreshClassPipe, RefreshIconPipe ],
	hostDirectives: [ MatTooltip ],
})
export class RefreshIconComponent<T> implements OnDestroy {
	private readonly matTooltip = inject(MatTooltip);
	private readonly subscriptions = new SubSink();

	public readonly refresh$ = input.required<Observable<T>>();
	public readonly doRefresh = input<null>();

	public readonly color = input<ThemePalette>();
	public readonly tooltip = input('');
	public readonly tooltipDisabled = input(false);

	/* time spent in DONE state (milliseconds) */
	public readonly debounceTime = input(10_000);
	/* css size string */
	public readonly size = input<string>();

	private readonly nextState = signal(RefreshState.IDLE);
	private readonly finished = toSignal(toObservable(this.nextState).pipe(
		map(finishedState => RefreshStateUtil.isFinished(finishedState)),
		delay(this.debounceTime())));

	public readonly refreshStateOutput = output<RefreshState>({ alias: 'refreshState' });
	public readonly refreshState = computed<RefreshState>(() => {
		const nextState = this.nextState();
		const finished = this.finished();

		if (finished && nextState !== RefreshState.ACTIVE) {
			return RefreshState.IDLE;
		} else {
			return nextState;
		}
	});

	public constructor() {
		effect(() => {
			this.matTooltip.message = RefreshStateUtil.getTooltip(this.refreshState(), this.tooltip());
			this.matTooltip.disabled = this.tooltipDisabled();
		});

		effect(() => {
			this.refreshStateOutput.emit(this.refreshState());
		});

		effect(() => {
			const doRefresh = this.doRefresh();

			if (typeof doRefresh !== 'undefined') {
				this.handleClick();
			}
		}, allowWrites);
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	public handleClick(): void {
		if (untracked(this.refreshState) === RefreshState.IDLE) {
			this.nextState.set(RefreshState.ACTIVE);

			this.subscriptions.sink = untracked(this.refresh$)
				.subscribe(this.refreshObserver);
		}
	}

	private get refreshObserver(): PartialObserver<T> {
		return {
			error: () => this.nextState.set(RefreshState.ERROR),
			complete: () => this.nextState.set(RefreshState.COMPLETE),
		};
	}
}
