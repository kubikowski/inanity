import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarItemComponent } from './sidebar-item.component';
import { NavigationConfig } from '../models/navigation-config.model';
import { SvgIcon } from '../../../shared/svg/svg-icon.enum';
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('SidebarItemComponent', () => {
	let component: SidebarItemComponent;
	let fixture: ComponentFixture<SidebarItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				SharedModule,
				MatIconTestingModule,
			],
			declarations: [ SidebarItemComponent ],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarItemComponent);
		component = fixture.componentInstance;
		component.config = NavigationConfig.from('About', SvgIcon.WHEEL, 'about');
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
