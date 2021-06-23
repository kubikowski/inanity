import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ExternalSvgIcon } from 'src/app/shared/svg/external-svg-icon.enum';
import { InternalSvgIcon } from 'src/app/shared/svg/internal-svg-icon.enum';

@Injectable({ providedIn: 'root' })
export class SvgIconService {

	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer,
	) {
		this.registerInternalIcons();
		this.registerExternalIcons();
	}

	private registerInternalIcons(): void {
		const iconEntries = Object.entries(InternalSvgIcon);

		iconEntries.forEach(([ iconKey, iconLocation ]) => {
			const iconUrl = `assets/svg/${ iconLocation }.svg`;

			this.registerIcon(iconKey, iconUrl);
		});
	}

	private registerExternalIcons(): void {
		const iconEntries = Object.entries(ExternalSvgIcon);

		iconEntries.forEach(([ iconKey, iconUrl ]) => {
			this.registerIcon(iconKey, iconUrl);
		});
	}

	private registerIcon(iconKey: string, iconUrl: string): void {
		const safeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(iconUrl);

		this.matIconRegistry.addSvgIcon(iconKey, safeResourceUrl);
	}
}
