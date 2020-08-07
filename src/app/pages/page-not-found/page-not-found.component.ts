import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SvgService } from '../../shared/svg/services/svg.service';
import { IconFile } from '../../shared/svg/models/icon-file.enum';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.scss', './../page.component.scss']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
	subscriptions = new SubSink();

	@ViewChild('wheelIconRef')
	wheelIconRef: ElementRef;
	wheelIconElement$: Observable<SVGElement>;

	constructor(private svgService: SvgService) {
	}

	ngOnInit(): void {
		this.wheelIconElement$ = this.svgService.getIcon(IconFile.WHEEL);
		this.subscriptions.sink = this.wheelIconElement$
			.pipe(filter(element => typeof this.wheelIconRef !== 'undefined'))
			.subscribe(element => this.wheelIconRef.nativeElement.innerHTML = element);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
