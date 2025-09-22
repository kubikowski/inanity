import { inject, Injectable } from '@angular/core';
import { doc, DocumentData, DocumentReference, DocumentSnapshot, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/core/firebase/services/firebase.service';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
	private readonly firebaseService = inject(FirebaseService);
	private readonly firestore = inject(Firestore);

	private readonly userId = this.firebaseService.userId;


	// region read documents
	public async readDocument<T extends DocumentData>(docName: string): Promise<DocumentSnapshot<T>> {
		const docRef = this.getDocRef(docName);
		return await getDoc(docRef) as DocumentSnapshot<T>;
	}

	public async readSubDocument<T extends DocumentData>(docName: string, subDocName: string): Promise<DocumentSnapshot<T>> {
		const docRef = this.getSubDocRef(docName, subDocName);
		return await getDoc(docRef) as DocumentSnapshot<T>;
	}
	// endregion read documents


	// region write documents
	public async writeDocument<T extends DocumentData>(docName: string, document: T): Promise<void> {
		const docRef = this.getDocRef(docName);
		await setDoc(docRef, { ...document }, { merge: true });
	}

	public async writeSubDocument<T extends DocumentData>(docName: string, subDocName: string, document: T): Promise<void> {
		const docRef = this.getSubDocRef(docName, subDocName);
		await setDoc(docRef, { ...document }, { merge: true });
	}
	// endregion write documents


	// region document reference
	public getDocRef<T extends DocumentData>(docName: string): DocumentReference<T> {
		return doc(this.firestore, docName, this.getUserId()) as DocumentReference<T>;
	}

	public getSubDocRef<T extends DocumentData>(docName: string, subDocName: string): DocumentReference<T> {
		return doc(this.firestore, docName, this.getUserId(), subDocName) as DocumentReference<T>;
	}

	private getUserId(): string {
		const userId = this.userId();

		if (userId === null) {
			throw new Error('User is unauthenticated');
		}

		return userId;
	}
	// endregion document reference
}
