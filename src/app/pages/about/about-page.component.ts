import { ChangeDetectionStrategy, Component } from '@angular/core';
import { aboutCardData } from 'src/app/features/about/models/about-card-data.constant';

@Component({
	selector: 'about-page',
	templateUrl: './about-page.component.html',
	styleUrls: [ './about-page.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
	public readonly aboutCardData = aboutCardData;
}
