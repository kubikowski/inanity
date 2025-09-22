import { effect, inject, Injectable } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { UserAccount } from 'src/app/core/firebase/models/user-account.model';
import { FirebaseService } from 'src/app/core/firebase/services/firebase.service';

/**
 * Currently disabled in favor of FirestoreDatabase
 */
@Injectable({ providedIn: 'root' })
export class FirebaseRealtimeDatabaseService {
	private readonly firebaseService = inject(FirebaseService);
	private readonly database = inject(Database);

	public constructor() {
		effect(() => {
			const userAccount = this.firebaseService.userAccount();

			if (userAccount !== null) {
				this.writeUserData(userAccount)
					.catch(console.error);
			}
		});
	}

	private async writeUserData(userAccount: UserAccount): Promise<void> {
		await set(ref(this.database, `users/${ userAccount.userId }/account`), userAccount);
	}
}
