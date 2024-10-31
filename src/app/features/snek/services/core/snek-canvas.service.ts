import { computed, effect, inject, Injectable, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { pairwise } from 'src/app/core/functions/signal/pairwise.function';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';
import { CanvasService } from 'src/app/features/background/services/canvas.service';
import { SnekGridNodeType } from 'src/app/features/snek/models/grid/snek-grid-node-type.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { SnekNode } from 'src/app/features/snek/models/snek/snek-node.model';
import { SnekIcon, SnekIconPack, SnekIconUtil } from 'src/app/features/snek/models/svg/snek-icon.enum';
import { SnekResolutionService } from 'src/app/features/snek/services/core/snek-resolution.service';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Injectable()
export class SnekCanvasService extends CanvasService {
	private readonly snekResolutionService = inject(SnekResolutionService);
	private readonly snekStateService = inject(SnekStateService);
	private readonly svgIconService = inject(SvgIconService);

	private readonly scalar = computed(() => this.pixelDensity() * 20);
	protected readonly rawCanvasWidth = computed(() => this.snekResolutionService.snekWidth() * 20);
	protected readonly rawCanvasHeight = computed(() => this.snekResolutionService.snekHeight() * 20);

	private readonly namespace = SnekIconUtil.getNamespace(SnekIconPack.DOTTED);
	private readonly svgElements = toSignal(this.svgIconService.getIcons(Object.values(SnekIcon), this.namespace));
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
		const scalar = untracked(this.scalar);

		context.fillStyle = ((width + height) % 2 === 1)
			? colorTheme.colorDefaultBackground
			: colorTheme.colorAccentBackground;

		context.fillRect(width * scalar, height * scalar, scalar, scalar);
	}

	private drawSnekNode(context: CanvasRenderingContext2D, snekGridNode: SnekGridNode, gameCounter: number): void {
		this.drawGridNode(context, snekGridNode.width, snekGridNode.height);

		const svgPath = this.getIcon(snekGridNode, gameCounter);
		if (svgPath === null) return;

		const pathString = svgPath.attributes.getNamedItem('d')?.nodeValue ?? null;
		if (pathString === null) return;

		const scalar = untracked(this.scalar);
		const domMatrix = svgPath.ownerSVGElement?.createSVGMatrix()
			.translate(...snekGridNode.getIconTranslation(scalar))
			.rotate(snekGridNode.getIconRotation())
			.scale(scalar / 100);

		const path = new Path2D();
		path.addPath(new Path2D(pathString), domMatrix);

		context.fillStyle = this.getIconColor(snekGridNode.type);
		context.fill(path);
	}

	private getIcon(snekGridNode: SnekGridNode, gameCounter: number): SVGPathElement | null {
		const svgElements = untracked(this.svgElements);
		if (typeof svgElements === 'undefined') return null;

		const snekIconOptions = snekGridNode.getIconOptions(gameCounter);
		for (const snekIcon of snekIconOptions) {
			const svgElement = svgElements[snekIcon];

			if (svgElement !== null) {
				return svgElement.firstElementChild as SVGPathElement | null;
			}
		}

		return null;
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
}
