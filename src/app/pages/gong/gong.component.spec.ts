import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GongComponent } from './gong.component';
import { SharedModule } from '../../shared/shared.module';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('GongComponent', () => {
	let component: GongComponent;
	let fixture: ComponentFixture<GongComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [
				SharedModule,
				MatIconTestingModule
			],
			declarations: [ GongComponent ],
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
