import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { AboutCardData } from 'src/app/features/about/models/about-card-data.interface';
import { Braces } from 'src/app/features/about/models/braces.constant';
import { BackgroundService } from 'src/app/features/background/services/background.service';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';

@Component({
	selector: 'about-card',
	templateUrl: 'about-card.component.html',
	styleUrl: 'about-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatCardModule, DyslexicTextComponent,
	],
	host: {
		'[class.small-format]': 'smallFormat()',
		'[class.large-format]': 'largeFormat()',
	},
})
export class AboutCardComponent {
	private readonly backgroundService = inject(BackgroundService);

	public readonly data = input.required<AboutCardData>();

	public readonly smallFormat = computed(() => this.data().content?.some(content => content.linked) ?? false);
	public readonly largeFormat = computed(() => typeof this.data().image !== 'undefined');
	public readonly backdrop = this.backgroundService.enabled;

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
