import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

	subscriptions = new SubSink();

	title = 'inanity';
	dyslexicTitles: string[] = [
		'iannity',
		'innaity',
		'inainty',
		'inantiy',
		'ininaty',
		'inatiny',
		'ianinty',
		'innitay',
		'ianitny',
	];

	constructor() {
	}

	ngOnInit(): void {
		this.subscriptions.sink = timer(0, 2000)
			.subscribe(() => this.title = this.getNewTitle());
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	getNewTitle(): string {
		let odds = Math.floor(Math.random() * 60);
		for (const title of this.dyslexicTitles) {
			if (odds === 0) {
				return title;
			}
			odds--;
		}
		return 'inanity';
	}
}
