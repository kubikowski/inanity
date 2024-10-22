import { computed, effect, inject, Injectable, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { pairwise } from 'src/app/core/functions/signal/pairwise.function';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';
import { CanvasService } from 'src/app/features/background/services/canvas.service';
import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNodeType } from 'src/app/features/snek/models/grid/snek-grid-node-type.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { SnekNode } from 'src/app/features/snek/models/snek/snek-node.model';
import { SnekIcon } from 'src/app/features/snek/models/svg/snek-icon.enum';
import { SnekResolutionService } from 'src/app/features/snek/services/core/snek-resolution.service';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Injectable()
export class SnekCanvasService extends CanvasService {
	private readonly snekResolutionService = inject(SnekResolutionService);
	private readonly snekStateService = inject(SnekStateService);
	private readonly svgIconService = inject(SvgIconService);

	protected readonly rawCanvasWidth = computed(() => this.snekResolutionService.snekWidth() * 20);
	protected readonly rawCanvasHeight = computed(() => this.snekResolutionService.snekHeight() * 20);

	private readonly svgElements = toSignal(this.svgIconService.getIcons(Object.values(SnekIcon)));
	private readonly pairwiseState = pairwise(this.snekStateService.gameState);

	public constructor() {
		super();

		effect(() => this.initializeGame());
		effect(() => this.drawGameState());
	}

	private initializeGame(): void {
		const context = this.context();
		const svgElements = this.svgElements();
		this.colorsService.computedPalette();
		const snekGame = this.snekStateService.snekGame();
		if (context === null || typeof svgElements === 'undefined') return;

		const snekWidth = untracked(this.snekResolutionService.snekWidth);
		const snekHeight = untracked(this.snekResolutionService.snekHeight);

		for (let width = 0; width < snekWidth; width++) {
			for (let height = 0; height < snekHeight; height++) {
				this.drawGridNode(context, width, height);
			}
		}

		let snekNode: SnekNode | null = snekGame.snek.head;
		while (snekNode !== null) {
			this.drawSnekNode(context, snekNode.snekGridNode, snekGame.counter);
			snekNode = snekNode.child;
		}
	}

	private drawGameState(): void {
		const context = this.context();
		const svgElements = this.svgElements();
		const [ currentState, previousState ] = this.pairwiseState();
		this.colorsService.computedPalette();
		if (context === null || typeof svgElements === 'undefined') return;

		if (typeof previousState !== 'undefined' && previousState.gameCounter < currentState.gameCounter) {
			this.drawSnekNode(context, previousState.headNode, currentState.gameCounter);
			this.drawSnekNode(context, previousState.tailNode, currentState.gameCounter);
		}

		this.drawSnekNode(context, currentState.headNode, currentState.gameCounter);
		this.drawSnekNode(context, currentState.tailNode, currentState.gameCounter);
		this.drawSnekNode(context, currentState.foodNode, currentState.gameCounter);
	}

	private drawGridNode(context: CanvasRenderingContext2D, width: number, height: number) {
		const colorTheme = untracked(this.colorsService.theme);

		context.fillStyle = ((width + height) % 2 === 1)
			? colorTheme.colorDefaultBackground
			: colorTheme.colorAccentBackground;

		context.fillRect(width * 20, height * 20, 20, 20);
	}

	private drawSnekNode(context: CanvasRenderingContext2D, snekGridNode: SnekGridNode, gameCounter: number): void {
		this.drawGridNode(context, snekGridNode.width, snekGridNode.height);

		const snekIcon = snekGridNode.getIcon(gameCounter);
		if (snekIcon === null) return;

		const svgPath = (untracked(this.svgElements)?.[snekIcon]?.firstElementChild ?? null) as SVGPathElement | null;
		if (svgPath === null) return;

		const nodeValue = svgPath.attributes.getNamedItem('d')?.nodeValue ?? null;
		if (nodeValue === null) return;

		const domMatrix = svgPath.ownerSVGElement?.createSVGMatrix()
			.translate(...SnekCanvasService.getSvgTranslation(snekGridNode))
			.rotate(SnekCanvasService.getSvgRotation(snekGridNode))
			.scale(20 / 100);

		const path = new Path2D();
		path.addPath(new Path2D(nodeValue), domMatrix);

		context.fillStyle = this.getIconColor(snekGridNode.type);
		context.fill(path);
	}

	private getIconColor(snekGridNodeType: SnekGridNodeType): string {
		const palette = untracked(this.colorsService.computedPalette);

		switch (snekGridNodeType) {
			default:
			case SnekGridNodeType.SNEK:
				return palette.colorDefault;
			case SnekGridNodeType.FOOD: {
				return palette.colorDarkest;
			}
		}
	}

	private static getSvgTranslation(snekGridNode: SnekGridNode): [ number, number ] {
		const headWidth = snekGridNode.width * 20;
		const headHeight = snekGridNode.height * 20;

		switch (snekGridNode.snekNode?.direction) {
			default:
			case SnekDirection.RIGHT:
				return [ headWidth, headHeight ];
			case SnekDirection.DOWN:
				return [ headWidth + 20, headHeight ];
			case SnekDirection.LEFT:
				return [ headWidth + 20, headHeight + 20 ];
			case SnekDirection.UP:
				return [ headWidth, headHeight + 20 ];
		}
	}

	private static getSvgRotation(snekGridNode: SnekGridNode): number {
		switch (snekGridNode.snekNode?.direction) {
			default:
			case SnekDirection.RIGHT:
				return 0;
			case SnekDirection.DOWN:
				return 90;
			case SnekDirection.LEFT:
				return 180;
			case SnekDirection.UP:
				return 270;
		}
	}
}
