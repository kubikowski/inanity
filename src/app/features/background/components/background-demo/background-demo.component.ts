import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, viewChild } from '@angular/core';
import { BackgroundType, BackgroundTypeUtil } from 'src/app/features/background/models/background-type.enum';
import { BackgroundDemoService } from 'src/app/features/background/services/background-demo.service';
import { BackgroundService } from 'src/app/features/background/services/background.service';

@Component({
	selector: 'background-demo',
	templateUrl: 'background-demo.component.html',
	styleUrl: 'background-demo.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ BackgroundDemoService ],
	host: {
		'[class.selected]': 'selected()',
		'[class.gradient]': 'gradient()',
		'(click)': 'selectBackgroundType()',
		'(keydown.enter)': 'selectBackgroundType()',
		'tabindex': '0',
	},
})
export class BackgroundDemoComponent implements AfterViewInit {
	private readonly backgroundDemoService = inject(BackgroundDemoService);
	private readonly backgroundService = inject(BackgroundService);

	private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
	public readonly type = input.required<BackgroundType>();

	private readonly selectedType = this.backgroundService.type;
	public readonly selected = computed(() => this.type() === this.selectedType());

	public readonly gradient = computed(() => BackgroundTypeUtil.gradient(this.type()));

	public ngAfterViewInit(): void {
		this.backgroundDemoService.backgroundType.set(this.type());
		this.backgroundDemoService.initialize(this.canvas().nativeElement);
	}

	public selectBackgroundType(): void {
		this.selectedType.set(this.type());
	}
}
