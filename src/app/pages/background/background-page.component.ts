import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';

@Component({
	selector: 'background-page',
	template: '<h1><dyslexic-text text="Pure Background Noise"/></h1>',
	styles: [
		`:host {
			text-align: center;
			text-decoration: underline;
			text-shadow: var(--shadow-color) 2px 2px 2px;
		}`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ DyslexicTextComponent ],
})
export class BackgroundPageComponent { }
