import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SnekResultsComponent } from 'src/app/pages/not-found/snek/snek-results/snek-results.component';

@Injectable()
export class SnekDialogService {

	constructor(
		private dialog: MatDialog,
	) { }

	public results(score: number, highScore: number): Observable<void> {
		const dialogRef = this.dialog.open(
			SnekResultsComponent,
			{
				width: '300px',
				data: { score, highScore },
			},
		);

		return dialogRef.afterClosed();
	}
}
