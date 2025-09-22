import { effect, inject, Injectable } from '@angular/core';
import { linkWithCredential } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/core/firebase/services/firebase.service';
import { FirestoreService } from 'src/app/core/firebase/services/firestore.service';

@Injectable({ providedIn: 'root' })
export class UserUpgradeService {
	private readonly firebaseService = inject(FirebaseService);
	private readonly firestoreService = inject(FirestoreService);

	private readonly authCredential = this.firebaseService.authCredential;
	private readonly anonymousUser = this.firebaseService.anonymousUser;
	private readonly identifiedUser = this.firebaseService.identifiedUser;

	public constructor() {
		effect(() => {
			this.upgradeAnonymousAccount()
				.catch(console.error);
		});
	}

	/**
	 * The real kicker here is that we will need to do firestore data migrations.
	 * Because we can have multiple _(previously anonymous)_ accounts
	 * for a given identified user.
	 *
	 * And whenever said user signs into their existing account with an anonymous source,
	 * we need the ability to migrate data generated in the anonymous account
	 * over to the identified account.
	 */
	private async upgradeAnonymousAccount(): Promise<void> {
		const anonymousUser = this.anonymousUser();
		const identifiedUser = this.identifiedUser();
		const authCredential = this.authCredential();

		if (anonymousUser !== null && identifiedUser !== null && authCredential !== null) {
			console.log('Upgrading anonymous account:', { anonymousUser, identifiedUser, authCredential });
			await linkWithCredential(anonymousUser, authCredential);
		}
	}
}
