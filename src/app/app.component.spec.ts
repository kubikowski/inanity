import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { NavigationModule } from 'src/app/navigation/navigation.module';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AppComponent', () => {
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [
				BrowserAnimationsModule,
				RouterTestingModule,
				NavigationModule,
				SharedModule,
			],
			declarations: [ AppComponent ],
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
