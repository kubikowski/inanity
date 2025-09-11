import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Page } from 'src/app/core/browser/components/page/page.directive';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';

@Component({
	selector: 'background-page',
	template: `
		<h2><dyslexic-text text="Pure Background Noise"/></h2>
	`,
	styleUrl: 'background-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ DyslexicTextComponent ],
})
export class BackgroundPageComponent extends Page { }
