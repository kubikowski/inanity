import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Page } from 'src/app/core/browser/components/page/page.directive';
import { HandIcon, HandIconUtil } from 'src/app/core/svg/hand-icon.enum';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { SnekComponent } from 'src/app/features/snek/snek.component';

@Component({
	selector: 'not-found',
	templateUrl: 'not-found-page.component.html',
	styleUrl: 'not-found-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatCardModule, MatIcon,
		DyslexicTextComponent, SnekComponent,
	],
})
export class NotFoundPageComponent extends Page {
	public readonly HAND_ICON_OK = `${ HandIconUtil.namespace }:${ HandIcon.OK }`;
}
