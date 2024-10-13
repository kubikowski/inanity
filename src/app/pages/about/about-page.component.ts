import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutCardComponent } from 'src/app/features/about/components/about-card/about-card.component';
import { aboutCardData } from 'src/app/features/about/models/about-card-data.constant';

@Component({
	selector: 'about-page',
	templateUrl: 'about-page.component.html',
	styleUrl: 'about-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ AboutCardComponent ],
})
export class AboutPageComponent {
	public readonly aboutCardData = aboutCardData;
}
