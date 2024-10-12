import { Injectable, OnDestroy } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { delay, filter, mergeMap, switchMap } from 'rxjs/operators';
import { Observed } from 'rxjs-observed-decorator';
import { clamp } from 'src/app/core/functions/number/clamp.function';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';
import { MovingBackgroundIcon } from 'src/app/features/background/models/svg/moving-background-icon.model';
import { SinIconUtil } from 'src/app/features/background/models/svg/sin-icon.enum';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class MovingBackgroundService implements OnDestroy {
	private readonly subscriptions = new SubSink();

	@Observed() public isEnabled: boolean;
	@Observed() public amount: number;
	@Observed() private renderedIcons: ReadonlyMap<number, MovingBackgroundIcon> = new Map();

	public readonly isEnabled$!: Observable<boolean>;
	public readonly amount$!: Observable<number>;
	public readonly renderedIcons$!: Observable<ReadonlyMap<number, MovingBackgroundIcon>>;

	public constructor(
		private readonly svgIconService: SvgIconService,
	) {
		this.svgIconService.registerInternalIcons(SinIconUtil.registry);

		this.isEnabled = JSON.parse(localStorage.getItem('moving-background') ?? 'true') as boolean;
		this.amount = JSON.parse(localStorage.getItem('moving-background-amount') ?? '5') as number;

		this.initializeIcons();
		this.persistSettings();
	}

	public ngOnDestroy(): void {
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
