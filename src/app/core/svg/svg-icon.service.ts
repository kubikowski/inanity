import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

	public getIcons<T extends string>(iconKeys: T[]): Observable<Record<T, SVGElement>> {
		return forkJoin(iconKeys.map(iconKey => this.getIcon(iconKey)))
			.pipe(map(icons => {
				const iconMap = <Record<T, SVGElement>>{};

				for (let index = 0; index < iconKeys.length; index++) {
					iconMap[iconKeys[index] as T] = icons[index] as SVGElement;
				}

				return iconMap;
			}));
	}

	public getIcon(iconKey: string): Observable<SVGElement> {
		if (iconKey.includes(':')) {
			const [ parsedNamespace, parsedIconKey ] = iconKey.split(':') as [ string, string ];
			return this.matIconRegistry.getNamedSvgIcon(parsedIconKey, parsedNamespace);
		} else {
			return this.matIconRegistry.getNamedSvgIcon(iconKey);
		}
	}
}
