import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationConfig } from '../models/navigation-config.model';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { filter } from 'rxjs/operators';
import { SvgService } from '../../../shared/svg/services/svg.service';

@Component({
	selector: 'sidebar-item',
	templateUrl: './sidebar-item.component.html',
	styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent implements OnInit, OnDestroy {

	subscriptions = new SubSink();

	@Input('config')
	config: NavigationConfig;

	@Input()
	sidenav: MatSidenav;

	@ViewChild('iconRef')
	iconRef: ElementRef;
	iconElement$: Observable<SVGElement>;

	constructor(private svgService: SvgService) {
	}

	ngOnInit(): void {
		this.iconElement$ = this.svgService.getIcon(this.config.iconFile);
		this.subscriptions.sink = this.iconElement$
			.pipe(filter(element => typeof this.iconRef !== 'undefined'))
			.subscribe(element => this.iconRef.nativeElement.innerHTML = element);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.sidenav.toggle();
	}
}
