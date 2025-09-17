import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Page } from 'src/app/core/browser/components/page/page.directive';
import { AboutCardComponent } from 'src/app/features/about/components/about-card/about-card.component';
import { aboutCardData } from 'src/app/features/about/models/about-card-data.constant';

@Component({
	selector: 'about-page',
	templateUrl: 'about-page.component.html',
	styleUrl: 'about-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ AboutCardComponent ],
})
export class AboutPageComponent extends Page {
	public readonly aboutCardData = aboutCardData;
}
