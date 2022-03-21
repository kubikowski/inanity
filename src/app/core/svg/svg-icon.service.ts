import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ExternalSvgIcon } from 'src/app/core/svg/external-svg-icon.enum';
import { InternalSvgIcon } from 'src/app/core/svg/internal-svg-icon.enum';

@Injectable({ providedIn: 'root' })
export class SvgIconService {

	public constructor(
		private readonly matIconRegistry: MatIconRegistry,
		private readonly domSanitizer: DomSanitizer,
	) {
		this.registerInternalIcons(InternalSvgIcon);
		this.registerExternalIcons(ExternalSvgIcon);
	}

	public registerInternalIcons(internalSvgIcon: Record<string, string>): void {
		const iconEntries = Object.entries(internalSvgIcon);

		iconEntries.forEach(([ iconKey, iconLocation ]) => {
			const iconUrl = `assets/svg/${ iconLocation }.svg`;

			this.registerIcon(iconKey, iconUrl);
		});
	}

	public registerExternalIcons(externalSvgIcons: Record<string, string>): void {
		const iconEntries = Object.entries(externalSvgIcons);

		iconEntries.forEach(([ iconKey, iconUrl ]) => {
			this.registerIcon(iconKey, iconUrl);
		});
	}

	public registerIcon(iconKey: string, iconUrl: string): void {
		const safeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(iconUrl);

		this.matIconRegistry.addSvgIcon(iconKey, safeResourceUrl);
	}
}
