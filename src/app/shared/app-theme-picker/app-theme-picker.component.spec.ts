import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppThemePickerComponent } from './app-theme-picker.component';

describe('AppThemePickerComponent', () => {
	let component: AppThemePickerComponent;
	let fixture: ComponentFixture<AppThemePickerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppThemePickerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppThemePickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
