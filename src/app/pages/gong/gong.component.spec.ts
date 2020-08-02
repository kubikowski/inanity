import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GongComponent } from './gong.component';

describe('GongComponent', () => {
	let component: GongComponent;
	let fixture: ComponentFixture<GongComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GongComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GongComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
