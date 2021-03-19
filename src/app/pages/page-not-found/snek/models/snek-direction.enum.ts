export enum SnekDirection {
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

export function inverseDirection(direction: SnekDirection): SnekDirection {
	switch (direction) {
		case SnekDirection.UP:
			return SnekDirection.DOWN;
		case SnekDirection.DOWN:
			return SnekDirection.UP;
		case SnekDirection.LEFT:
			return SnekDirection.RIGHT;
		case SnekDirection.RIGHT:
			return SnekDirection.LEFT;
		default:
			return null;
	}
}
