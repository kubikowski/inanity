import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observed } from 'rxjs-observed-decorator';
import { ClockUtil } from 'src/app/features/clock/clock-util.function';
import { SubSink } from 'subsink';

@Component({
	selector: 'clock',
	template: '{{ time$ | async | date: \'shortTime\' }}',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockComponent implements OnDestroy {
	private readonly subscriptions = new SubSink();

	@Observed() private time = ClockUtil.getStartTime();
	public readonly time$!: Observable<Date>;

	public constructor() {
		this.subscriptions.sink = interval(1000)
			.pipe(map(() => ClockUtil.countDown(this.time)))
			.subscribe(time => this.time = time);
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
