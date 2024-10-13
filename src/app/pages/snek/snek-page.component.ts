import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { SnekComponent } from 'src/app/features/snek/snek.component';

@Component({
	selector: 'snek-page',
	templateUrl: 'snek-page.component.html',
	styleUrl: 'snek-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatCardModule, MatIcon,
		DyslexicTextComponent, SnekComponent,
	],
})
export class SnekPageComponent {
	public readonly SnekIcon = SvgIcon.SNAKE;
}
