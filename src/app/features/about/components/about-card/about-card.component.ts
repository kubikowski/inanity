import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { AboutCardData } from 'src/app/features/about/models/about-card-data.interface';
import { Braces } from 'src/app/features/about/models/braces.constant';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';

@Component({
	selector: 'about-card',
	templateUrl: 'about-card.component.html',
	styleUrl: 'about-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatCardModule, DyslexicTextComponent,
	],
})
export class AboutCardComponent {
	public readonly data = input.required<AboutCardData>();

	private readonly braces = toSignal(Braces.random$());

	public readonly openBrace = computed(() => {
		const [ openBrace ] = this.braces() ?? [ ];
		return openBrace;
	});

	public readonly closeBrace = computed(() => {
		const [ , closeBrace ] = this.braces() ?? [ ];
		return closeBrace;
	});
}
