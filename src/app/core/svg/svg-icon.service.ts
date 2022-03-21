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
		this.registerIcons(ExternalSvgIcon);
	}

	public registerInternalIcons(internalSvgIcon: Record<string, string>, namespace?: string): void {
		const iconEntries = Object.entries(internalSvgIcon);

		iconEntries.forEach(([ iconKey, iconLocation ]) => {
			const iconUrl = `assets/svg/${ iconLocation }.svg`;

			this.registerIcon(iconKey, iconUrl, namespace);
		});
	}

	public registerIcons(externalSvgIcons: Record<string, string>, namespace?: string): void {
		const iconEntries = Object.entries(externalSvgIcons);

		iconEntries.forEach(([ iconKey, iconUrl ]) => {
			this.registerIcon(iconKey, iconUrl, namespace);
		});
	}

	public registerIcon(iconKey: string, iconUrl: string, namespace?: string): void {
		const safeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(iconUrl);

		if (typeof namespace !== 'undefined') {
			this.matIconRegistry.addSvgIconInNamespace(namespace, iconKey, safeResourceUrl);
		} else {
			this.matIconRegistry.addSvgIcon(iconKey, safeResourceUrl);
		}
	}

	public registerInternalIconPack(iconPackLocation: string, namespace?: string): void {
		const iconPackUrl = `assets/svg/${ iconPackLocation }.svg`;

		this.registerIconPack(iconPackUrl, namespace);
	}

	public registerIconPack(iconPackUrl: string, namespace?: string): void {
		const safeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(iconPackUrl);

		if (typeof namespace !== 'undefined') {
			this.matIconRegistry.addSvgIconSetInNamespace(namespace, safeResourceUrl);
		} else {
			this.matIconRegistry.addSvgIconSet(safeResourceUrl);
		}
	}
}
