import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { SvgIcon } from './svg-icon.enum';

@Injectable({ providedIn: 'root' })
export class SvgIconService {

	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer,
	) { }

	public registerIcons(): void {
		const iconKeys = Object.values(SvgIcon);

		iconKeys.forEach(key => {
			this.matIconRegistry.addSvgIcon(
				key,
				this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/${key}.svg`),
			);
		});
	}
}
