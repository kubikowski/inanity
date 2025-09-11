import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TypefaceComponent } from 'src/app/core/fonts/components/typeface/typeface.component';
import { Typefaces } from '../../models/typefaces.constant';

@Component({
	selector: 'fonts',
	templateUrl: 'fonts.component.html',
	styleUrl: 'fonts.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ TypefaceComponent ],
})
export class FontsComponent {
	public readonly typefaces = Typefaces;
}
