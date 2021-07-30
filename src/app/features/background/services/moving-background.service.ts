import { Injectable, OnDestroy } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { delay, filter, mergeMap, switchMap } from 'rxjs/operators';
import { Observed } from 'src/app/core/decorators/observed.decorator';
import { clamp } from 'src/app/core/functions/clamp/clamp.function';
import { MovingBackgroundIcon } from 'src/app/features/background/models/svg/moving-background-icon.model';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class MovingBackgroundService implements OnDestroy {
	private readonly subscriptions = new SubSink();

	@Observed() public isEnabled: boolean;
	public readonly isEnabled$: Observable<boolean>;

	@Observed() public amount: number;
	public readonly amount$: Observable<number>;

	@Observed() private renderedIcons: ReadonlyMap<number, MovingBackgroundIcon> = new Map();
	public readonly renderedIcons$: Observable<ReadonlyMap<number, MovingBackgroundIcon>>;

	constructor() {
		this.isEnabled = JSON.parse(localStorage.getItem('moving-background')) ?? true;
		this.amount = JSON.parse(localStorage.getItem('moving-background-amount')) ?? 5;

		this.initializeIcons();
		this.persistSettings();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private initializeIcons(): void {
		this.subscriptions.sink = this.amount$
			.pipe(
				switchMap(amount => interval(5000 / clamp(1, amount, 20))),
				filter(() => this.isEnabled),
				mergeMap(this.renderIcon.bind(this)),
				delay(30000),
			).subscribe(this.deRenderIcon.bind(this));
	}

	private renderIcon(): Observable<number> {
		const newIcon = MovingBackgroundIcon.random();

		this.renderedIcons = new Map([
			...this.renderedIcons.entries(),
			[ newIcon.id, newIcon ],
		]);

		return of(newIcon.id);
	}

	private deRenderIcon(iconId: number): void {
		this.renderedIcons = new Map([
			...[ ...this.renderedIcons.entries() ]
				.filter(([ id ]) => id !== iconId),
		]);
	}

	private persistSettings(): void {
		this.subscriptions.sink = this.isEnabled$
			.subscribe(isEnabled => localStorage.setItem('moving-background', String(isEnabled)));

		this.subscriptions.sink = this.amount$
			.subscribe(amount => localStorage.setItem('moving-background-amount', String(amount)));
	}
}
