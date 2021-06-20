import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgIcon } from 'src/app/shared/svg/svg-icon.enum';

@Injectable()
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
