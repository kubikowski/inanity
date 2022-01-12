export enum SnekDirection {
	UP = 'up',
	DOWN = 'down',
	LEFT = 'left',
	RIGHT = 'right',
}

export namespace SnekDirection {
	export const all: readonly SnekDirection[] = [
		SnekDirection.UP,
		SnekDirection.DOWN,
		SnekDirection.LEFT,
		SnekDirection.RIGHT,
	];

	export function inverse(direction: SnekDirection | null): SnekDirection | null {
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

	export function isValidChange(current: SnekDirection, next: SnekDirection): boolean {
		return next !== current
			&& next !== inverse(current);
	}
}
