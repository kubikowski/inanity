import { effect, inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/core/firebase/services/firebase.service';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
	private readonly firebaseService = inject(FirebaseService);
	private readonly firestore = inject(Firestore);

	private readonly userId = this.firebaseService.userId;

	public constructor() {
		effect(() => {
			this.writeUserAccountData()
				.catch(console.error);
		});
	}

	private async writeUserAccountData(): Promise<void> {
		const account = this.firebaseService.userAccount();

		if (account !== null) {
			await this.writeTable('users', { ...account });
		}
	}

	public async writeTable(tableName: string, tableData: Record<string, unknown>): Promise<void> {
		const userId = this.userId();
		if (userId === null) return;

		const tableDoc = doc(this.firestore, tableName, userId);
		await setDoc(tableDoc, { ...tableData }, { merge: true });
	}

	public async writeSubTable(tableName: string, subTableName: string, tableData: Record<string, unknown>): Promise<void> {
		const userId = this.userId();
		if (userId === null) return;

		const tableDoc = doc(this.firestore, tableName, userId, subTableName);
		await setDoc(tableDoc, { ...tableData }, { merge: true });
	}
}
