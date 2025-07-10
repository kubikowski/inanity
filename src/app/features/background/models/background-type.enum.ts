import { Bubble } from './bubble.model';
import { CanvasElement } from './canvas-element.model';
import { Panel } from './panel.model';

export enum BackgroundType {
	BUBBLES = 'BUBBLES',
	GLASS = 'GLASS',
}

export abstract class BackgroundTypeUtil {
	public static getReference(backgroundType: BackgroundType): CanvasElement {
		switch (backgroundType) {
			case BackgroundType.BUBBLES:
				return Bubble.reference();
			case BackgroundType.GLASS:
				return Panel.reference();
		}
	}
}
