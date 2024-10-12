export interface HeaderItem {
	readonly action: () => void;
	readonly authorized: boolean;
	readonly title: string;
	readonly icon: string;
	readonly iconFill?: boolean;
}
