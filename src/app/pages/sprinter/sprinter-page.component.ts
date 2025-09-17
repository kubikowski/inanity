import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BackgroundImageComponent } from 'src/app/core/browser/components/background-image/background-image.component';
import { Page } from 'src/app/core/browser/components/page/page.directive';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { MarkdownComponent } from 'src/app/features/markdown/markdown.component';

@Component({
	selector: 'sprinter-page',
	templateUrl: 'sprinter-page.component.html',
	styleUrl: 'sprinter-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		BackgroundImageComponent, DyslexicTextComponent, MarkdownComponent,
	],
})
export class SprinterPageComponent extends Page { }
