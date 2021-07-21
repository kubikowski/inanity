export class NavigationConfig {
	private constructor(
		public readonly title: string,
		public readonly icon: string,
		public readonly route: string,
	) { }

	public static from(title: string, icon: string, route: string): NavigationConfig {
		return new NavigationConfig(title, icon, route);
	}
}
