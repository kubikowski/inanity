import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { CanvasSingleton } from 'src/app/features/background/models/canvas-singleton.model';

export class Blank extends CanvasSingleton {
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

	protected override calibrate(): this {
		return new Blank() as this;
	}

	protected override paint(): void {
	}
}
