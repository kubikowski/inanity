export class SnekGridLocation {
	private _up: SnekGridLocation;
	private _down: SnekGridLocation;
	private _left: SnekGridLocation;
	private _right: SnekGridLocation;

	constructor() {
	}

	public static new(): SnekGridLocation {
		return new SnekGridLocation();
	}

	public initialize(up: SnekGridLocation, down: SnekGridLocation, left: SnekGridLocation, right: SnekGridLocation): void {
		this._up = up;
		this._down = down;
		this._left = left;
		this._right = right;
	}
}
