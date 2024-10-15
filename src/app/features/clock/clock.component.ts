import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, signal, untracked } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClockUtil } from 'src/app/features/clock/clock-util.function';
import { SubSink } from 'subsink';

@Component({
	selector: 'clock',
	template: '{{ time() | date: \'shortTime\' }}',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ DatePipe ],
})
export class ClockComponent implements OnDestroy {
	private readonly subscriptions = new SubSink();

	public readonly time = signal(ClockUtil.getStartTime());

	public constructor() {
		this.subscriptions.sink = interval(1000)
			.pipe(map(() => ClockUtil.countDown(untracked(this.time))))
			.subscribe(time => this.time.set(time));
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
