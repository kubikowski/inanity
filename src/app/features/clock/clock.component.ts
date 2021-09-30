import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { Observed } from 'rxjs-observed-decorator';
import { SubSink } from 'subsink';

@Component({
	selector: 'clock',
	template: `<h4>{{ time$ | async | date: 'shortTime' }}</h4>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockComponent implements OnDestroy {
	private readonly subscriptions = new SubSink();

	@Observed() private time: Date;
	public readonly time$: Observable<Date>;

	public constructor() {
		this.subscriptions.sink = interval(100)
			.subscribe(() => this.time = new Date());
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
