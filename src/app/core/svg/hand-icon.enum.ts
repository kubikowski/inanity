export enum HandIcon {
	OK = 'OK',
}

export abstract class HandIconUtil {
	public static readonly namespace = 'hand';

	public static readonly all = [
		HandIcon.OK,
	] as const;

	public static readonly registry: Record<HandIcon, string> = {
		[HandIcon.OK]: 'hands/ok_hand',
	};

	public static random(): HandIcon {
		return this.all[ Math.floor(Math.random() * this.all.length) ]!;
	}
}
