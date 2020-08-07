import { SVGIcon } from '../../../shared/svg/models/svgicon.model';

export class NavigationConfig {
	private constructor(
		public title: string,
		public icon: SVGIcon,
		public route: string,
	) { }

	public static from(title: string, icon: SVGIcon, route: string): NavigationConfig {
		return new NavigationConfig(title, icon, route);
	}
}
