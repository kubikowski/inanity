export class NavigationItem {
	private constructor(
		public readonly title: string,
		public readonly icon: string,
		public readonly route: string,
		public readonly enabled: boolean,
	) { }

	public static from(title: string, icon: string, route: string, enabled = true): NavigationItem {
		return new NavigationItem(title, icon, route, enabled);
	}
}
