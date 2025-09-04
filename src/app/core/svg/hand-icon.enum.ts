export enum HandIcon {
	OK = 'OK',
}

export abstract class HandIconUtil {
	public static all: ReadonlyArray<HandIcon> = [
		HandIcon.OK,
	] as const;

	public static registry: Record<HandIcon, string> = {
		[HandIcon.OK]: 'hands/ok_hand',
	};
}
