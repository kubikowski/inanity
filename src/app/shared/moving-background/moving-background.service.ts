import { Injectable, OnDestroy } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { delay, filter, mergeMap, switchMap } from 'rxjs/operators';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { MovingBackgroundIcon } from 'src/app/shared/moving-background/moving-background-icon.model';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class MovingBackgroundService implements OnDestroy {
	private readonly subscriptions = new SubSink();

	@Observed() private _isEnabled: boolean;
	private readonly _isEnabled$: Observable<boolean>;

	@Observed() private _amount: number;
	private readonly _amount$: Observable<number>;

	@Observed() private renderedIcons: ReadonlyMap<number, MovingBackgroundIcon> = new Map();
	public readonly renderedIcons$: Observable<ReadonlyMap<number, MovingBackgroundIcon>>;

	constructor() {
		const isEnabled = JSON.parse(localStorage.getItem('moving-background')) ?? true;
		const amount = JSON.parse(localStorage.getItem('moving-background-amount')) ?? 5;

		this.isEnabled = isEnabled;
		this.amount = amount;

		this.initializeIcons();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	public get isEnabled(): boolean {
		return this._isEnabled;
	}

	public set isEnabled(isEnabled: boolean) {
		this._isEnabled = isEnabled;

		localStorage.setItem('moving-background', String(isEnabled));
	}

	public get amount(): number {
		return this._amount;
	}

	public set amount(amount: number) {
		this._amount = amount;

		localStorage.setItem('moving-background-amount', String(amount));
	}

	private initializeIcons(): void {
		this.subscriptions.sink = this._amount$
			.pipe(
				switchMap(frequency => interval(5000 / frequency)),
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
}
