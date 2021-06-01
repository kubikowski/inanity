import { MatSidenav } from '@angular/material/sidenav';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigationService {

	private sidenav: MatSidenav;

	public initialize(sidenav: MatSidenav): void {
		this.sidenav = sidenav;
	}

	public toggle(): void {
		this.sidenav.toggle();
	}
}
