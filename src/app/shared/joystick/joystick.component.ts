import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { create, JoystickManager, JoystickManagerOptions, JoystickOutputData } from 'nipplejs';

@Component({
	selector: 'joystick',
	templateUrl: './joystick.component.html',
	styleUrls: [ './joystick.component.scss' ],
})
export class JoystickComponent implements AfterViewInit, OnDestroy {
	private joystickManager: JoystickManager;

	@Input() public options: JoystickManagerOptions = { };

	@Output() public activate = new EventEmitter<JoystickOutputData>();
	@Output() public move = new EventEmitter<JoystickOutputData>();
	@Output() public release = new EventEmitter<JoystickOutputData>();

	constructor(private readonly elementRef: ElementRef) { }

	ngAfterViewInit(): void {
		this.initializeJoystick();
	}

	ngOnDestroy(): void {
		this.joystickManager.destroy();
	}

	private initializeJoystick(): void {
		this.joystickManager = create({ ...this.defaultOptions, ...this.options });

		this.joystickManager.on('start', (event, nipple) => {
			this.activate.emit(nipple);
		});

		this.joystickManager.on('move', (event, nipple) => {
			this.move.emit(nipple);
		});

		this.joystickManager.on('end', (event, nipple) => {
			this.release.emit(nipple);
		});
	}

	private get defaultOptions(): JoystickManagerOptions {
		return {
			zone: this.elementRef.nativeElement,
			position: { left: '50%', top: '50%' },
			mode: 'semi',
			color: 'var(--disabled-text-color)',
			size: 75,
		};
	}
}
