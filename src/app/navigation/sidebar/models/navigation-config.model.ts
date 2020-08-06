export class NavigationConfig {
	private constructor(
		public title: string,
		public iconName: string,
		public route: string,
	) { }

	public static from(title: string, iconName: string, route: string): NavigationConfig {
		return new NavigationConfig(title, iconName, route);
	}
}
