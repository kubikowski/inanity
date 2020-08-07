import { Injectable } from '@angular/core';
import { SVGIcon } from '../models/svgicon.model';
import { IconFile } from '../models/icon-file.enum';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SvgService {

	private readonly icons: Map<IconFile, SVGIcon>;

	constructor(private http: HttpClient) {
		this.icons = new Map(
			Object.values(IconFile).map(fileName => [fileName, new SVGIcon(fileName)])
		);
	}

	getIcon(fileName: IconFile): Observable<SVGElement> {
		const icon = this.icons.get(fileName);
		if (!icon.requested) {
			this.requestIconElement(icon);
		}
		return icon.element$;
	}

	requestIconElement(icon: SVGIcon): void {
		this.http.get(`assets/svg/${icon.fileName}`, { responseType: 'text' })
			.subscribe(iconElement => {
				icon.element = iconElement as unknown as SVGElement;
			});
	}
}
