import { Blank } from 'src/app/features/background/models/blank.model';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';

export class None extends Blank {
	public override readonly paintInterval = 50 as 0;

	public static override reference(): None {
		return new None();
	}

	protected override isReferenceType(canvasElement: CanvasElement): canvasElement is this {
		return canvasElement instanceof None;
	}

	protected override shouldClearCanvas(): boolean {
		return true;
	}
}
