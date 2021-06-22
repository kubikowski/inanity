import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalbolgeSpecificationComponent } from './malbolge-specification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../shared/shared.module';

describe('MalbolgeSpecificationComponent', () => {
	let component: MalbolgeSpecificationComponent;
	let fixture: ComponentFixture<MalbolgeSpecificationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				BrowserAnimationsModule,
				SharedModule,
			],
			declarations: [ MalbolgeSpecificationComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MalbolgeSpecificationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
