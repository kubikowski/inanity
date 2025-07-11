import { Blank } from 'src/app/features/background/models/blank.model';
import { Grain } from 'src/app/features/background/models/grain.model';
import { Bubble } from './bubble.model';
import { CanvasElement } from './canvas-element.model';
import { Panel } from './panel.model';

export enum BackgroundType {
	BLANK = 'BLANK',
	BUBBLES = 'BUBBLES',
	GLASS = 'GLASS',
	GRAIN = 'GRAIN',
}

export abstract class BackgroundTypeUtil {
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
		}
	}
}
