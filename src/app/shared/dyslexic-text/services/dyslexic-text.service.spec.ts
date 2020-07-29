import { TestBed } from '@angular/core/testing';

import { DyslexicTextService } from './dyslexic-text.service';

describe('DyslexicTextService', () => {
	let service: DyslexicTextService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DyslexicTextService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
