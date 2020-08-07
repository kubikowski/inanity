import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarItemComponent } from './sidebar-item.component';

describe('SidebarButtonComponent', () => {
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
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});