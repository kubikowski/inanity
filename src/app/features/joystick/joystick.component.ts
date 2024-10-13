import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { create, JoystickManager, JoystickManagerOptions, JoystickOutputData } from 'nipplejs';

@Component({
	selector: 'joystick',
	template: '',
	styleUrl: 'joystick.component.scss',
	standalone: true,
})
export class JoystickComponent implements AfterViewInit, OnDestroy {
	private joystickManager!: JoystickManager;

	@Input() public options: JoystickManagerOptions = { };

	@Output() public activate = new EventEmitter<JoystickOutputData>();
	@Output() public move = new EventEmitter<JoystickOutputData>();
	@Output() public release = new EventEmitter<JoystickOutputData>();

	public constructor(
		private readonly elementRef: ElementRef,
	) { }

	public ngAfterViewInit(): void {
		this.initializeJoystick();
	}

	public ngOnDestroy(): void {
		this.joystickManager.destroy();
	}

	private initializeJoystick(): void {
		this.joystickManager = create({ ...this.defaultOptions, ...this.options });

		this.joystickManager.on('start', (_event, nipple) => {
			this.activate.emit(nipple);
		});

		this.joystickManager.on('move', (_event, nipple) => {
			this.move.emit(nipple);
		});

		this.joystickManager.on('end', (_event, nipple) => {
			this.release.emit(nipple);
		});
	}

	private get defaultOptions(): JoystickManagerOptions {
		return {
			zone: this.elementRef.nativeElement as HTMLElement,
			color: 'var(--disabled-text-color)',
			size: 75,
			threshold: 1 / 3,
			fadeTime: 100,
			position: { left: '50%', top: '50%' },
			mode: 'dynamic',
			dynamicPage: true,
		};
	}
}
