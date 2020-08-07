import { Injectable } from '@angular/core';
import { SVGIcon } from '../models/svgicon.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IconName } from '../models/icon-name.enum';
import { IconFile } from '../models/icon-file.enum';

@Injectable({ providedIn: 'root' })
export class SvgService {

	private icons: Map<IconName, SVGIcon>;

	public readonly WheelIcon = new SVGIcon(IconName.WHEEL, IconFile.WHEEL);
	public readonly GongIcon = new SVGIcon(IconName.GONG, IconFile.GONG);

	constructor(private http: HttpClient) {
		[this.WheelIcon, this.GongIcon].forEach(icon => {
			this.icons[icon.iconName] = icon;
		});
	}

	getIconByName(iconName: IconName): Observable<SVGElement> {
		return this.icons.get(iconName).element$;
	}
}
