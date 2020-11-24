import { TestBed } from '@angular/core/testing';

import { SvgIconService } from './svg-icon.service';

describe('SvgIconService', () => {
	let service: SvgIconService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SvgIconService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
