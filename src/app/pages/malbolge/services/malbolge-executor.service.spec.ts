import { TestBed } from '@angular/core/testing';

import { MalbolgeExecutorService } from './malbolge-executor.service';

describe('MalbolgeExecutorService', () => {
	let service: MalbolgeExecutorService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MalbolgeExecutorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
