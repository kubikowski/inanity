import { Blank } from 'src/app/features/background/models/blank.model';
import { Grain } from 'src/app/features/background/models/grain.model';
import { Grid } from 'src/app/features/background/models/grid.model';
import { None } from 'src/app/features/background/models/none.model';
import { Bubble } from './bubble.model';
import { CanvasElement } from './canvas-element.model';
import { Panel } from './panel.model';

export enum BackgroundType {
	BLANK = 'BLANK',
	BUBBLES = 'BUBBLES',
	GLASS = 'GLASS',
	GRAIN = 'GRAIN',
	GRID = 'GRID',
	NONE = 'NONE',
}

export abstract class BackgroundTypeUtil {
	public static readonly default = BackgroundType.GRAIN;

	public static getReference(backgroundType: BackgroundType): CanvasElement {
		switch (backgroundType) {
			case BackgroundType.BLANK:
				return Blank.reference();
			case BackgroundType.BUBBLES:
				return Bubble.reference();
			case BackgroundType.GLASS:
				return Panel.reference();
			case BackgroundType.GRAIN:
				return Grain.reference();
			case BackgroundType.GRID:
				return Grid.reference();
			case BackgroundType.NONE:
				return None.reference();
		}
	}

	public static gradient(backgroundType: BackgroundType): boolean {
		switch (backgroundType) {
			case BackgroundType.NONE:
				return false;
			default:
				return true;
		}
	}

	public static moving(backgroundType: BackgroundType): boolean {
		switch (backgroundType) {
			case BackgroundType.BLANK:
			case BackgroundType.NONE:
				return false;
			default:
				return true;
		}
	}
}
