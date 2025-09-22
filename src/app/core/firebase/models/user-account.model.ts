import { User } from '@angular/fire/auth';
import { getAnonymousAnimal } from 'src/app/core/firebase/models/anonymous-animals.constant';

export class UserAccount {
	private constructor(
		public readonly userId: string,
		public readonly userName: string,
		public readonly userNickname: string,
		public readonly userEmail: string | null,
		public readonly userProfilePicture: string | null,
		public readonly isAnonymous: boolean,
		public readonly createdOn: Date,
		public readonly updatedOn: Date,
	) { }

	public static from(userAccount: UserAccount): UserAccount {
		return new UserAccount(
			userAccount.userId,
			userAccount.userName,
			userAccount.userNickname,
			userAccount.userEmail,
			userAccount.userProfilePicture,
			userAccount.isAnonymous,
			userAccount.createdOn,
			userAccount.updatedOn,
		);
	}

	public static fromUser(user: User): UserAccount {
		const nickname = `Anonymous ${ getAnonymousAnimal() }`;
		const createdOn = new Date();

		return new UserAccount(
			user.uid,
			user.displayName ?? nickname,
			nickname,
			user.email, // ?? '',
			user.photoURL, // ?? 'default_avatar.png',
			user.isAnonymous,
			createdOn,
			createdOn,
		);
	}
}
