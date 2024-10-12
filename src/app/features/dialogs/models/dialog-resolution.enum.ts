export enum DialogResolution {
	DISMISS,
	SUCCESS,
	FAILED,
}

export abstract class DialogResolutionUtil {
	public static succeeded(dialogResolution: DialogResolution): boolean {
		return dialogResolution === DialogResolution.SUCCESS;
	}
}
