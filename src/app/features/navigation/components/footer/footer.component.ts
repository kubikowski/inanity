import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: 'footer.component.html',
	styleUrl: 'footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ ],
})
export class FooterComponent {
}
