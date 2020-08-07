import { Injectable } from '@angular/core';
import { SVGIcon } from '../models/svgicon.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SvgService {

	private icons: Map<string, SVGIcon>;

	public readonly WheelIcon = new SVGIcon(
		'wheel-icon',
		'wheel.svg',
	);
	public readonly GongIcon = new SVGIcon(
		'gong-icon',
		'gong.svg',
	);

	constructor(private http: HttpClient) {
		[this.WheelIcon, this.GongIcon].forEach(icon => {
			this.icons[icon.iconName] = icon;
		});
	}

	getIconByName(iconName: string): Observable<SVGElement> {
		return this.icons.get(iconName).element$;
	}
}
