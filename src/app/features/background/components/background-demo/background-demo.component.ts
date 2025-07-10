import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { BackgroundType } from 'src/app/features/background/models/background-type.enum';
import { BackgroundDemoService } from 'src/app/features/background/services/background-demo.service';
import { BackgroundService } from 'src/app/features/background/services/background.service';

@Component({
	selector: 'background-demo',
	template: '<canvas #canvas></canvas>',
	styleUrl: 'background-demo.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ BackgroundDemoService ],
	standalone: true,
	host: {
		'(click)': 'selectBackgroundType()',
	},
})
export class BackgroundDemoComponent implements AfterViewInit {
	private readonly backgroundDemoService = inject(BackgroundDemoService);
	private readonly backgroundService = inject(BackgroundService);

	private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
	public readonly type = input.required<BackgroundType>();

	public ngAfterViewInit(): void {
		const { width, height } = this.canvas().nativeElement.getBoundingClientRect();
		this.backgroundDemoService.rawCanvasWidth.set(width * 2.5);
		this.backgroundDemoService.rawCanvasHeight.set(height * 2.5);
		this.backgroundDemoService.backgroundType.set(this.type());

		this.backgroundDemoService.initialize(this.canvas().nativeElement);
	}

	public selectBackgroundType(): void {
		this.backgroundService.type.set(this.type());
	}
}
