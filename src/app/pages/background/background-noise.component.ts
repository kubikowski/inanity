import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'background-noise',
	template: `
		<h1>
			<dyslexic-text text="Background Noise"></dyslexic-text>
		</h1>`,
	styles: [
		`:host {
			text-align: center;
			text-decoration: underline;
		}`
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundNoiseComponent { }
