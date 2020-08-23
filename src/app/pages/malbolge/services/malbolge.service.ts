import { Injectable } from '@angular/core';
import { Trit } from '../models/ternary.model';
import { CrazyLookup } from '../models/lookup/crazy-lookup.constant';
import { EncryptionLookup } from '../models/lookup/encryption-lookup.constant';

@Injectable({
	providedIn: 'root'
})
export class MalbolgeService {

	constructor() {
	}

	public crazy(input1: Trit, input2: Trit): Trit {
		return CrazyLookup[input1][input2];
	}

	public encrypt(input: number): number {
		return EncryptionLookup[input % 94];
	}
}
