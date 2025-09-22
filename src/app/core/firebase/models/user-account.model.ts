import { User } from '@angular/fire/auth';

export class UserAccount {
	private constructor(
		public readonly userId: string,
		public readonly userName: string,
		public readonly userNickname: string,
		public readonly userEmail: string | null,
		public readonly userProfilePicture: string | null,
		public readonly isAnonymous: boolean,
		public readonly updatedOn: Date,
	) { }

	public static from(user: User | null): UserAccount | null {
		if (user === null) return null;

		return new UserAccount(
			user.uid,
			user.displayName ?? 'Anonymous Panda',
			'Anonymous Panda',
			user.email, // ?? '',
			user.photoURL, // ?? 'default_avatar.png',
			user.isAnonymous,
			new Date(),
		);
	}
}
