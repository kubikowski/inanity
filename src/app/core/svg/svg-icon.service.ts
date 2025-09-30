import { DOCUMENT, inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ErrorEmission, ignoreError } from 'src/app/core/functions/rxjs/ignore-error.function';
import { ExternalSvgIcon } from 'src/app/core/svg/external-svg-icon.enum';
import { HandIconUtil } from 'src/app/core/svg/hand-icon.enum';
import { InternalSvgIcon } from 'src/app/core/svg/internal-svg-icon.enum';

@Injectable({ providedIn: 'root' })
export class SvgIconService {
	private readonly matIconRegistry = inject(MatIconRegistry);
	private readonly domSanitizer = inject(DomSanitizer);

	private readonly document = inject(DOCUMENT);
	private readonly hiddenIcons = this.createHiddenIcons();

	public constructor() {
		this.registerInternalIcons(InternalSvgIcon);
		this.registerInternalIcons(HandIconUtil.registry, HandIconUtil.namespace);
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

	public getIcons<T extends string>(iconKeys: T[], namespace?: string): Observable<Record<T, SVGElement | null>> {
		return forkJoin(iconKeys.map(iconKey => this.getIcon(iconKey, namespace)))
			.pipe(map(icons => {
				const iconMap = <Record<T, SVGElement | null>>{};

				for (let index = 0; index < iconKeys.length; index++) {
					iconMap[iconKeys[index] as T] = icons[index] as SVGElement | null;
				}

				return iconMap;
			}));
	}

	public getIcon(iconKey: string, namespace?: string): Observable<SVGElement | null> {
		if (iconKey.includes(':')) {
			const [ parsedNamespace, parsedIconKey ] = iconKey.split(':') as [ string, string ];
			return this.matIconRegistry.getNamedSvgIcon(parsedIconKey, parsedNamespace)
				.pipe(tap(icon => this.registerHiddenIcon(icon, parsedIconKey, parsedNamespace)), ignoreError(ErrorEmission.NULL));
		} else {
			return this.matIconRegistry.getNamedSvgIcon(iconKey, namespace)
				.pipe(tap(icon => this.registerHiddenIcon(icon, iconKey, namespace)), ignoreError(ErrorEmission.NULL));
		}
	}

	private createHiddenIcons(): HTMLDivElement {
		const hiddenIcons = this.document.createElement('div');

		hiddenIcons.setAttribute('id', 'hidden-icons');
		hiddenIcons.setAttribute('class', 'cdk-visually-hidden');

		this.document.body.appendChild(hiddenIcons);
		return hiddenIcons;
	}

	public registerHiddenIcon(svgElement: SVGElement, iconKey: string, namespace?: string): void {
		const iconId = `icon:${ namespace ?? '' }:${ iconKey }`;
		const hasHiddenIcon = Array.from(this.hiddenIcons.children)
			.some(icon => icon.id === iconId);

		if (!hasHiddenIcon) {
			svgElement.setAttribute('id', iconId);
			this.hiddenIcons.appendChild(svgElement);
		}
	}
}
