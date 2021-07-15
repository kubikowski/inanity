import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class BackgroundCanvasService {
	private canvas: ElementRef<HTMLCanvasElement>;
	private context: CanvasRenderingContext2D;

	public initialize(canvas: ElementRef<HTMLCanvasElement>): void {
		this.canvas = canvas;
		this.context = canvas.nativeElement.getContext('2d');
	}

	public addRectangle(size: number): void {
		this.context.fillStyle = BackgroundCanvasService.randomColorString;

		this.context.fillRect(size, size, size, size);
	}

	public beginLineSegment(x: number, y: number): void {
		this.context.beginPath();

		this.context.moveTo(x, y);

	}

	public addLineSegment(x: number, y: number): void {
		this.context.strokeStyle = BackgroundCanvasService.randomColorString;

		this.context.lineTo(x, y);

		this.context.stroke();
	}

	public addCircle(x: number, y: number): void {
		this.context.strokeStyle = BackgroundCanvasService.randomColorString;

		this.context.beginPath();

		this.context.arc(x, y, 30, 0, Math.PI * 2);

		this.context.stroke();
	}

	private static get randomColorString(): string {
		const red = Math.floor(Math.random() * 255);
		const green = Math.floor(Math.random() * 255);
		const blue = Math.floor(Math.random() * 255);

		return `rgba(${ red }, ${ green }, ${ blue }, 0.25)`;
	}
}
