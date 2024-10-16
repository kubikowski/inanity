import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { computedStateful } from 'src/app/core/functions/signal/computed-stateful.function';
import { ClockUtil } from 'src/app/features/clock/clock-util.function';

@Component({
	selector: 'clock',
	template: '{{ time() | date: \'shortTime\' }}',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ DatePipe ],
})
export class ClockComponent {
	private readonly clockCycle = toSignal(interval(1000));

	public readonly time = computedStateful(ClockUtil.getStartTime(), time => {
		this.clockCycle();
		return ClockUtil.countDown(time);
	});
}
