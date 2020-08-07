import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.scss', './../page.component.scss']
})
export class PageNotFoundComponent implements OnInit {

	@ViewChild('wheelIcon')
	wheelIcon: ElementRef;

	constructor(private http: HttpClient) {
	}

	ngOnInit(): void {
		this.http.get('assets/svg/wheel.svg', { responseType: 'text' })
			.subscribe(data => {
				this.wheelIcon.nativeElement.innerHTML = data as unknown as SVGElement;
			});
	}
}
