import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SnekDialogService } from 'src/app/pages/not-found/snek/services/snek-dialog.service';
import { SnekInputListenerService } from 'src/app/pages/not-found/snek/services/snek-input-listener.service';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/snek-state.service';
import { SnekStatisticsService } from 'src/app/pages/not-found/snek/services/snek-statistics.service';

@Component({
	selector: 'snek',
	templateUrl: './snek.component.html',
	styleUrls: [ './snek.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SnekDialogService,
		SnekInputListenerService,
		SnekStateService,
		SnekStatisticsService,
	],
})
export class SnekComponent {

	constructor(
		private snekDialogService: SnekDialogService,
		private snekInputListenerService: SnekInputListenerService,
		private snekStateService: SnekStateService,
		private snekStatisticsService: SnekStatisticsService,
	) { }

}
