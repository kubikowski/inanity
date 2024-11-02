import { Observable } from 'rxjs';

export interface ConfirmDialogConfiguration {
	action: <T> () => Observable<T>;
	title: string;
	paragraphs: string[];
	loadingMessage?: string;
	submitButtonText?: string;
	cancelButtonText?: string;
}
