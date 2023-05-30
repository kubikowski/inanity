import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'malbolge-specification',
	templateUrl: './malbolge-specification.component.html',
	styleUrls: [ './malbolge-specification.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MalbolgeSpecificationComponent {

	public step = 1;

	public setStep(index: number): void {
		this.step = index;
	}
}
