import { Component, ElementRef, inject, input, OnDestroy, output, untracked } from '@angular/core';
import { create, JoystickManager, JoystickManagerOptions, JoystickOutputData } from 'nipplejs';

@Component({
	selector: 'joystick',
	template: '',
	styleUrl: 'joystick.component.scss',
	standalone: true,
})
export class JoystickComponent implements OnDestroy {
	public readonly options = input<JoystickManagerOptions>({ });

	public readonly activate = output<JoystickOutputData>();
	public readonly move = output<JoystickOutputData>();
	public readonly release = output<JoystickOutputData>();

	private readonly elementRef = inject(ElementRef);
	private readonly joystickManager = this.initializeJoystick();

	public ngOnDestroy(): void {
		this.joystickManager.destroy();
	}

	private initializeJoystick(): JoystickManager {
		const joystickManager = create({ ...this.defaultOptions, ...untracked(this.options) });

		joystickManager.on('start', (_event, nipple) => {
			this.activate.emit(nipple);
		});

		joystickManager.on('move', (_event, nipple) => {
			this.move.emit(nipple);
		});

		joystickManager.on('end', (_event, nipple) => {
			this.release.emit(nipple);
		});

		return joystickManager;
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
