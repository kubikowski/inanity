import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, map } from 'rxjs/operators';
import { FloatUpAnimation, FloatUpAnimationState } from 'src/app/shared/animations/float-up.animation';
import { MovingBackgroundIcon } from 'src/app/shared/moving-background/moving-background-icon.model';
import { MovingBackgroundService } from 'src/app/shared/moving-background/moving-background.service';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: [ './background.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [ FloatUpAnimation ],
})
export class BackgroundComponent {
	public readonly renderedIcons$: Observable<ReadonlyArray<MovingBackgroundIcon>>;
	public readonly floating = FloatUpAnimationState.FLOATING;

	constructor(
		private readonly movingBackgroundService: MovingBackgroundService,
	) {
		this.renderedIcons$ = this.movingBackgroundService.renderedIcons$
			.pipe(
				distinctUntilKeyChanged('size'),
				map(iconMap => Array.from(iconMap.values())),
			);
	}

	public trackIconBy(index: number, renderedIcon: MovingBackgroundIcon): number {
		return renderedIcon?.id ?? null;
	}
}
