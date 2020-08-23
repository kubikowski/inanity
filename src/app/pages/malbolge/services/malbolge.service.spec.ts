import { TestBed } from '@angular/core/testing';

import { MalbolgeService } from './malbolge.service';

describe('MalbolgeService', () => {
	let service: MalbolgeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MalbolgeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
