import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DyslexicTextComponent } from './dyslexic-text.component';

describe('DyslexicTextComponent', () => {
	let component: DyslexicTextComponent;
	let fixture: ComponentFixture<DyslexicTextComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [DyslexicTextComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DyslexicTextComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
