import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalbolgeComponent } from './malbolge.component';

describe('MalbolgeComponent', () => {
	let component: MalbolgeComponent;
	let fixture: ComponentFixture<MalbolgeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MalbolgeComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MalbolgeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
