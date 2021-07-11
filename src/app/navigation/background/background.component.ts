import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { RenderedIcon } from 'src/app/navigation/background/rendered-icon.model';
import { FloatUpAnimation, FloatUpAnimationState } from 'src/app/shared/animations/float-up.animation';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: [ './background.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [ FloatUpAnimation ],
})
export class BackgroundComponent implements OnDestroy {
	private readonly subscriptions = new SubSink();
	public readonly floating = FloatUpAnimationState.FLOATING;

	@Observed() private renderedIcons: ReadonlyArray<RenderedIcon> = [];
	public readonly renderedIcons$: Observable<ReadonlyArray<RenderedIcon>>;

	constructor() {
		this.subscriptions.sink = timer(0, 1000)
			.subscribe(this.renderIcon.bind(this));

		this.subscriptions.sink = timer(24000, 1000)
			.subscribe(this.deRenderIcon.bind(this));
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private renderIcon(): void {
		this.renderedIcons = [
			...this.renderedIcons,
			RenderedIcon.random(),
		];
	}

	private deRenderIcon(): void {
		this.renderedIcons = this.renderedIcons.slice(1);
	}

	public trackIconBy(index: number, renderedIcon: RenderedIcon): number {
		return renderedIcon?.id ?? null;
	}
}
