import { IconFile } from '../../../shared/svg/models/icon-file.enum';

export class NavigationConfig {
	private constructor(
		public title: string,
		public iconFile: IconFile,
		public route: string,
	) { }

	public static from(title: string, iconFile: IconFile, route: string): NavigationConfig {
		return new NavigationConfig(title, iconFile, route);
	}
}
