import { AfterViewInit, ChangeDetectionStrategy, Component, untracked, viewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { injectCoreServices } from 'src/app/core/injection/core-service.injector';
import { BackgroundComponent } from 'src/app/features/background/components/background/background.component';
import { FooterComponent } from 'src/app/features/navigation/components/footer/footer.component';
import { HeaderComponent } from 'src/app/features/navigation/components/header/header.component';
import { SidebarComponent } from 'src/app/features/navigation/components/sidebar/sidebar.component';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrl: 'app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [
		RouterOutlet, MatSidenavModule,
		HeaderComponent, FooterComponent, SidebarComponent, BackgroundComponent,
	],
})
export class AppComponent implements AfterViewInit {
	private readonly services = injectCoreServices();

	private readonly sidenav = viewChild.required<MatSidenav>('sidenav');
	public ngAfterViewInit(): void {
		this.services.navigationService.initialize(untracked(this.sidenav));
	}
}
