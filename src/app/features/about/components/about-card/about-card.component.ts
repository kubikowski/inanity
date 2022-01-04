import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Observed } from 'rxjs-observed-decorator';
import { map } from 'rxjs/operators';
import { AboutCardData } from 'src/app/features/about/models/about-card-data.interface';
import { BracePair, Braces } from 'src/app/features/about/models/braces.constant';
import { SubSink } from 'subsink';

@Component({
	selector: 'about-card',
	templateUrl: './about-card.component.html',
	styleUrls: [ './about-card.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutCardComponent implements OnDestroy {
	private readonly subscriptions = new SubSink();

	@Observed() private openBrace: string;
	@Observed() private closeBrace: string;

	public readonly openBrace$: Observable<string>;
	public readonly closeBrace$: Observable<string>;

	@Input() public data: AboutCardData;

	public constructor() {
		this.subscriptions.sink = Braces.random$()
			.subscribe(([ openBrace, closeBrace ]) => {
				this.openBrace = openBrace;
				this.closeBrace = closeBrace;
			});
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
