import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarItemComponent } from './sidebar-item.component';
import { NavigationConfig } from '../models/navigation-config.model';
import { SVGIcon } from '../../../shared/svg/models/svgicon.model';

describe('SidebarItemComponent', () => {
	let component: SidebarItemComponent;
	let fixture: ComponentFixture<SidebarItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SidebarItemComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarItemComponent);
		component = fixture.componentInstance;
		component.config = NavigationConfig.from('About', SVGIcon.Wheel, 'about');
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
