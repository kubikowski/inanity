import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Observed } from 'rxjs-observed-decorator';
import { AboutCardData } from 'src/app/features/about/models/about-card-data.interface';
import { Braces } from 'src/app/features/about/models/braces.constant';
import { SubSink } from 'subsink';

@Component({
	selector: 'about-card',
	templateUrl: './about-card.component.html',
	styleUrls: [ './about-card.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutCardComponent implements OnInit, OnDestroy {
	private readonly subscriptions = new SubSink();

	@Observed() private openBrace?: string;
	@Observed() private closeBrace?: string;

	public readonly openBrace$!: Observable<string>;
	public readonly closeBrace$!: Observable<string>;

	@Input() public data!: AboutCardData;

	public constructor() {
		this.subscriptions.sink = Braces.random$()
			.subscribe(([ openBrace, closeBrace ]) => {
				this.openBrace = openBrace;
				this.closeBrace = closeBrace;
			});
	}

	public ngOnInit(): void {
		if (typeof this.data === 'undefined') {
			console.error('missing input: data');
		}
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
