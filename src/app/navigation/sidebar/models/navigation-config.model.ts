export class NavigationConfig {
	private constructor(
		public title: string,
		public icon: string,
		public route: string,
	) { }

	public static from(title: string, icon: string, route: string): NavigationConfig {
		return new NavigationConfig(title, icon, route);
	}
}
