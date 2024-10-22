export enum SnekDirection {
	UP = 'up',
	DOWN = 'down',
	LEFT = 'left',
	RIGHT = 'right',
}

export abstract class SnekDirectionUtil {
	public static all: readonly SnekDirection[] = [
		SnekDirection.UP,
		SnekDirection.DOWN,
		SnekDirection.LEFT,
		SnekDirection.RIGHT,
	];

	public static inverse(direction: SnekDirection | null): SnekDirection | null {
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

	public static isValidChange(current: SnekDirection, next: SnekDirection): boolean {
		return next !== current
			&& next !== this.inverse(current);
	}

	public static nodeDirection(parentDirection: SnekDirection | null, childDirection: SnekDirection | null): SnekDirection | null {
		if (parentDirection === null) {
			return this.inverse(childDirection);
		} else if (childDirection === null || parentDirection === this.inverse(childDirection)) {
			return parentDirection;
		} else {
			return (this.isRotatedRight(parentDirection, childDirection))
				? parentDirection
				: childDirection;
		}
	}

	private static isRotatedRight(parentDirection: SnekDirection, childDirection: SnekDirection): boolean {
		switch (childDirection) {
			case SnekDirection.UP:
				return parentDirection === SnekDirection.LEFT;
			case SnekDirection.DOWN:
				return parentDirection === SnekDirection.RIGHT;
			case SnekDirection.LEFT:
				return parentDirection === SnekDirection.DOWN;
			case SnekDirection.RIGHT:
				return parentDirection === SnekDirection.UP;
		}
	}

	public static getIconRotation(direction: SnekDirection | null): number {
		switch (direction) {
			default:
			case SnekDirection.RIGHT:
				return 0;
			case SnekDirection.DOWN:
				return 90;
			case SnekDirection.LEFT:
				return 180;
			case SnekDirection.UP:
				return 270;
		}
	}

	public static getIconTranslation(direction: SnekDirection | null): [ number, number ] {
		switch (direction) {
			default:
			case SnekDirection.RIGHT:
				return [ 0, 0 ];
			case SnekDirection.DOWN:
				return [ 20, 0 ];
			case SnekDirection.LEFT:
				return [ 20, 20 ];
			case SnekDirection.UP:
				return [ 0, 20 ];
		}
	}
}
