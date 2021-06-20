import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class NavigationService {

	private sidenav: MatSidenav;

	public initialize(sidenav: MatSidenav): void {
		this.sidenav = sidenav;
	}

	public toggle(): void {
		this.sidenav.toggle();
	}
}
