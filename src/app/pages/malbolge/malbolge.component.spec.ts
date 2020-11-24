import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalbolgeComponent } from './malbolge.component';
import { MalbolgeSpecificationComponent } from './malbolge-specification/malbolge-specification.component';
import { SharedModule } from '../../shared/shared.module';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MalbolgeComponent', () => {
	let component: MalbolgeComponent;
	let fixture: ComponentFixture<MalbolgeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				BrowserAnimationsModule,
				SharedModule,
				MatIconTestingModule,
			],
			declarations: [ MalbolgeComponent, MalbolgeSpecificationComponent ],
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
