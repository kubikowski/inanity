import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Page } from 'src/app/core/browser/components/page/page.directive';
import { MarkdownComponent } from 'src/app/features/markdown/markdown.component';

@Component({
	selector: 'set-utilities-page',
	template: '<markdown url="https://unpkg.com/set-utilities@latest/README.md"/>',
	styleUrl: 'set-utilities-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ MarkdownComponent ],
})
export class SetUtilitiesPageComponent extends Page { }
