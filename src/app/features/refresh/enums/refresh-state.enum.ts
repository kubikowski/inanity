export enum RefreshState {
	IDLE = 'IDLE',
	ACTIVE = 'ACTIVE',
	COMPLETE = 'COMPLETE',
	ERROR = 'ERROR',
}

export abstract class RefreshStateUtil {
	public static isFinished(refreshState: RefreshState): boolean {
		switch (refreshState) {
			case RefreshState.IDLE:
			case RefreshState.ACTIVE:
				return false;
			case RefreshState.COMPLETE:
			case RefreshState.ERROR:
				return true;
		}
	}

	public static getIcon(refreshState: RefreshState): string {
		switch (refreshState) {
			case RefreshState.IDLE:
			case RefreshState.ACTIVE:
				return 'autorenew';
			case RefreshState.COMPLETE:
				return 'done';
			case RefreshState.ERROR:
				return 'clear';
		}
	}

	public static getClass(refreshState: RefreshState): string {
		return `state-${ refreshState.toLowerCase() }`;
	}

	public static getTooltip(refreshState: RefreshState, tooltip: string): string {
		switch (refreshState) {
			case RefreshState.IDLE:
				return `Refresh ${ tooltip }`.trim();
			case RefreshState.ACTIVE:
				return `Refreshing ${ tooltip }`.trim();
			case RefreshState.COMPLETE:
				return `Refreshed ${ tooltip }`.trim();
			case RefreshState.ERROR:
				return `Failed to Refresh ${ tooltip }`.trim();
		}
	}
}
