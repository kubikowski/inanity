import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { SvgIcon } from './svg-icon.enum';

@Injectable({ providedIn: 'root' })
export class SvgIconService {

	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer,
	) {
		this.registerIcons();
	}

	private registerIcons(): void {
		const iconKeys = Object.values(SvgIcon);

		iconKeys.forEach(iconKey => this.registerIcon(iconKey));
	}

	private registerIcon(iconKey: string): void {
		const iconUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/${ iconKey }.svg`);

		this.matIconRegistry.addSvgIcon(iconKey, iconUrl);
	}
}
