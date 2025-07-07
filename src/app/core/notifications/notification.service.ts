import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { mapToVoid } from 'src/app/core/functions/rxjs/map-to-void.function';

@Injectable({ providedIn: 'root' })
export class NotificationService {
	private readonly matSnackBar = inject(MatSnackBar);

	public async notify(message: string): Promise<void> {
		return await this.timeout(message, 5);
	}

	public async timeout(message: string, seconds: number): Promise<void> {
		const ref = this.matSnackBar.open(message, '', {
			horizontalPosition: 'end',
			verticalPosition: 'bottom',
			duration: seconds * 1000,
		});

		return await firstValueFrom(ref.afterDismissed().pipe(mapToVoid()));
	}
}
