export enum RefreshState {
	IDLE = 'IDLE',
	ACTIVE = 'ACTIVE',
	DONE = 'DONE',
}

export namespace RefreshState {
	export function getIcon(refreshState: RefreshState): string {
		switch (refreshState) {
			case RefreshState.IDLE:
			case RefreshState.ACTIVE:
				return 'autorenew';
			case RefreshState.DONE:
				return 'done';
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
			case RefreshState.DONE:
				return `Refreshed ${ tooltip }`.trim();
		}
	}
}
