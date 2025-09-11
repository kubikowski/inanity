import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { NavigationItem } from 'src/app/features/navigation/models/navigation-item.model';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';

@Component({
	selector: 'sidebar-item',
	templateUrl: 'sidebar-item.component.html',
	styleUrl: 'sidebar-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		RouterLink, RouterLinkActive, MatCardModule, MatIcon,
		DyslexicTextComponent,
	],
})
export class SidebarItemComponent {
	private readonly navigationService = inject(NavigationService);

	public readonly navigationItem = input.required<NavigationItem>();

	public toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.navigationService.toggle();
	}
}
