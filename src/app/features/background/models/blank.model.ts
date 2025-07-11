import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';

export class Blank extends CanvasElement {
	public override readonly renderInterval = 100;
	public override readonly paintInterval = 100;

	private constructor() {
		super();
	}

	public static reference(): Blank {
		return new Blank();
	}

	protected override isReferenceType(canvasElement: CanvasElement): canvasElement is this {
		return canvasElement instanceof Blank;
	}

	protected override inBoundaries(): true {
		return true;
	}

	protected override calibrateElements(): readonly this[] {
		return [ new Blank() ] as this[];
	}

	protected override render(): boolean {
		return true;
	}

	protected override shouldClearCanvas(): boolean {
		return false;
	}

	protected override paint(): void {
	}
}
