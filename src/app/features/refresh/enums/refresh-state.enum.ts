export enum RefreshState {
	IDLE = 'IDLE',
	ACTIVE = 'ACTIVE',
	COMPLETE = 'COMPLETE',
	ERROR = 'ERROR',
}

export namespace RefreshState {
	export function isFinished(refreshState: RefreshState): boolean {
		switch (refreshState) {
			case RefreshState.IDLE:
			case RefreshState.ACTIVE:
				return false;
			case RefreshState.COMPLETE:
			case RefreshState.ERROR:
				return true;
		}
	}

	export function getIcon(refreshState: RefreshState): string {
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

	export function getClass(refreshState: RefreshState): string {
		return `state-${ refreshState.toLowerCase() }`;
	}

	export function getTooltip(refreshState: RefreshState, tooltip: string): string {
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
