import { computed, effect, inject, Injectable, resource } from '@angular/core';
import { User } from '@angular/fire/auth';
import { UserAccount } from 'src/app/core/firebase/models/user-account.model';
import { FirebaseService } from 'src/app/core/firebase/services/firebase.service';
import { FirestoreService } from 'src/app/core/firebase/services/firestore.service';

@Injectable({ providedIn: 'root' })
export class UserAccountService {
	private readonly firebaseService = inject(FirebaseService);
	private readonly firestoreService = inject(FirestoreService);

	private readonly userAccountDoc = resource({
		params: () => ({ user: this.firebaseService.userInfo() }),
		loader: async ({ params: { user } }) => await this.getUserAccount(user),
	});

	public readonly userAccount = computed(() => this.userAccountDoc.value() ?? null);
	public constructor() {
		effect(() => console.log('user account:', this.userAccount()));
	}

	private async getUserAccount(user: User | null): Promise<UserAccount | null> {
		if (user === null) return null;

		const userAccountSnapshot = await this.firestoreService.readDocument<UserAccount>('users');
		const existingAccount = userAccountSnapshot.data();
		if (typeof existingAccount !== 'undefined') {
			return UserAccount.from(existingAccount);
		}

		const newAccount = UserAccount.fromUser(user);
		await this.firestoreService.writeDocument('users', newAccount);
		return newAccount;
	}
}
