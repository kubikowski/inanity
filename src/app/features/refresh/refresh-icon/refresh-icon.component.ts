import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Observable, PartialObserver } from 'rxjs';
import { Observed } from 'rxjs-observed-decorator';
import { debounceTime, filter } from 'rxjs/operators';
import { RefreshState } from 'src/app/features/refresh/enums/refresh-state.enum';
import { SubSink } from 'subsink';

@Component({
	selector: 'refresh-icon',
	templateUrl: './refresh-icon.component.html',
	styleUrls: [ './refresh-icon.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefreshIconComponent<T> implements OnInit, AfterViewInit, OnDestroy {
	private readonly subscriptions = new SubSink();
	public readonly RefreshState = RefreshState;

	@Input() public refresh$: Observable<T>;
	@Input() public doRefresh$: Observable<void>;

	@Input() public color: ThemePalette;

	@Input() public tooltip = '';
	@Input() public tooltipDisabled = false;

	/* time spent in DONE state (milliseconds) */
	@Input() public debounceTime = 10_000;
	/* css size string */
	@Input() public size: string;

	@Observed() private refreshState = RefreshState.IDLE;
	public readonly refreshState$: Observable<RefreshState>;
	@Output() public readonly refreshStateChange = new EventEmitter<RefreshState>();

	@ViewChild('template', { static: true })
	private readonly template: TemplateRef<NgTemplateOutlet>;

	public constructor(
		private readonly viewContainerRef: ViewContainerRef,
	) {
		this.subscriptions.sink = this.refreshState$
			.pipe(
				filter(refreshState => RefreshState.isFinished(refreshState)),
				debounceTime(this.debounceTime),
			).subscribe(() => this.refreshState = RefreshState.IDLE);

		this.subscriptions.sink = this.refreshState$
			.subscribe(refreshState => this.refreshStateChange.emit(refreshState));
	}

	public ngOnInit(): void {
		if (!(this.refresh$ instanceof Observable)) {
			console.error('missing input: refreshAction$');
		}

		if (this.doRefresh$ instanceof Observable) {
			this.subscriptions.sink = this.doRefresh$
				.subscribe(() => this.handleClick());
		}
	}

	public ngAfterViewInit(): void {
		this.viewContainerRef.createEmbeddedView(this.template);
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	public handleClick(): void {
		if (this.refreshState === RefreshState.IDLE) {
			this.refreshState = RefreshState.ACTIVE;

			this.subscriptions.sink = this.refresh$
				.subscribe(this.refreshObserver);
		}
	}

	private get refreshObserver(): PartialObserver<T> {
		return {
			error: () => this.refreshState = RefreshState.ERROR,
			complete: () => this.refreshState = RefreshState.COMPLETE,
		};
	}
}
