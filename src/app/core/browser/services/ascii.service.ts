import { computed, effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ColorTheme } from 'src/app/core/colors/models/color-themes/color-theme.model';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';

const welcomeMessage = `
Thanks for stopping by!

If you’re reading this, please shoot me an email. I would love to hear from you!
holden@inanity.io
`;

@Injectable({ providedIn: 'root' })
export class AsciiService {
	private readonly svgIconService = inject(SvgIconService);

	private readonly icon = toSignal(this.svgIconService.getIcon(SvgIcon.INANITY));
	private readonly iconPath = computed(() => this.icon()?.lastElementChild?.lastElementChild as SVGPathElement ?? null);

	public constructor() {
		effect(() => this.logWelcomeMessage(this.iconPath()));
	}

	private logWelcomeMessage(iconPath: SVGPathElement | null): void {
		if (iconPath !== null) {
			const iconGrid = AsciiService.getSvgAlphaGrid(iconPath);
			const iconText = AsciiService.getGridText(iconGrid);
			const iconFormatting = AsciiService.getGridFormatting(iconGrid);

			const annotation = welcomeMessage.trim();
			const annotationText = AsciiService.getBorderedAnnotation(annotation, 40);
			const annotationFormatting = AsciiService.getAnnotationFormatting(annotation, 40);

			console.log(`\n${ iconText }\n\n${ annotationText }`, ...iconFormatting, ...annotationFormatting);
		}
	}

	// region Ascii Icon
	private static getSvgAlphaGrid(svgPath: SVGPathElement): number[][] {
		const { width, height } = AsciiService.getSvgLocalCoordinateSystem(svgPath);
		const { width: pixelWidth, height: pixelHeight } = AsciiService.getSvgPixelSize(width, height);

		const asciiGrid = <number[][]>[];
		for (let y = 0, iy = 0; y < height; y += pixelHeight, iy++) {
			asciiGrid[iy] = [];
			for (let x = 0, ix = 0; x < width; x += pixelWidth, ix++) {
				let bucket = 0;
				for (let dy = 0; dy < pixelHeight; dy++) {
					for (let dx = 0; dx < pixelWidth; dx++) {
						if (svgPath.isPointInFill({ x: x + dx, y: y + dy })) {
							bucket++;
						}
					}
				}
				asciiGrid[iy]![ix] = bucket / pixelWidth / pixelHeight;
			}
		}

		return asciiGrid;
	}

	private static getSvgLocalCoordinateSystem(svgPath: SVGPathElement | null): { width: number, height: number } {
		const svgViewportElement = svgPath?.viewportElement ?? null;

		return (svgViewportElement instanceof SVGSVGElement)
			? svgViewportElement.viewBox.baseVal
			: { width: 0, height: 0 };
	}

	private static getSvgPixelSize(svgWidth: number, svgHeight: number): { width: number, height: number } {
		const optimalAsciiWidth = 40;
		const optimalAsciiHeight = 20;

		const dimension = Math.max(svgWidth, svgHeight);
		const optimalWidthScaling = Math.max(Math.floor(dimension / optimalAsciiWidth), 1);
		const optimalHeightScaling = Math.max(Math.floor(optimalWidthScaling * (optimalAsciiWidth / optimalAsciiHeight)), 1);

		return {
			width: optimalWidthScaling,
			height: optimalHeightScaling,
		};
	}

	private static getGridText(grid: number[][]): string {
		return grid.map(row => row
			.map(alpha => alpha !== 0 ? '%c@' : ' ')
			.join('')
			.trimEnd())
			.join('\n');
	}

	/**
	 * Now technically, you can use CSS variables in the console formatter.
	 * However, those variables are defined by browser implementation.
	 * So in practice, they are wholly irrelevant. You have to use raw values.
 	 */
	private static getGridFormatting(grid: number[][]): string[] {
		const lightColor = ColorTheme.successColorLight;
		const darkColor = ColorTheme.successColorDark;

		return grid.map(row => row
			.filter(alpha => alpha !== 0)
			.map(alpha => `color: light-dark(${ lightColor.withAlpha(alpha).toString() }, ${ darkColor.withAlpha(alpha).toString() });`))
			.flat();
	}
	// endregion Ascii Icon


	// region Ascii Text
	private static getBorderedAnnotation(annotation: string, idealWidth: number): string {
		const topLine = `%c╔${ '═'.repeat(idealWidth - 2) }╗\n`;
		const bottomLine = `%c╚${ '═'.repeat(idealWidth - 2) }╝\n`;
		const interimLine = `%c╟${ '─'.repeat(idealWidth - 2) }╢\n`;

		const annotationLines = this.splitAnnotation(annotation, idealWidth);
		const textLines = annotationLines.map(text => (text.length > 0)
			? `%c║ %c${ text.padEnd(idealWidth - 4, ' ') } %c║\n`
			: interimLine);

		return `${ topLine }${ textLines.join('') }${ bottomLine }`;
	}

	private static getAnnotationFormatting(annotation: string, idealWidth: number): string[] {
		const lightColor = ColorTheme.infoColorLight;
		const darkColor = ColorTheme.infoColorDark;

		const borderFormatting = `color: light-dark(${ lightColor.withAlpha(0.50).toString() }, ${ darkColor.withAlpha(0.50).toString() });`;
		const textFormatting = 'font-weight: normal; color: default;';

		const annotationLines = this.splitAnnotation(annotation, idealWidth);
		const annotationLineFormatting = annotationLines.map(text => (text.length > 0)
			? [ borderFormatting, textFormatting, borderFormatting ]
			: [ borderFormatting ]).flat();

		return [ borderFormatting, ...annotationLineFormatting, borderFormatting ];
	}

	private static splitAnnotation(annotation: string, idealWidth: number): string[] {
		const annotationLines = annotation.split('\n');

		return annotationLines.map(line => (line.length > idealWidth - 4)
			? this.splitAnnotationLine(line, idealWidth)
			: [ line ])
			.flat();
	}

	private static splitAnnotationLine(annotationLine: string, idealWidth: number): string[] {
		const annotationWords = annotationLine.split(/\s/g);

		return annotationWords.reduce((lines, word) => {
			const currentLine = lines[lines.length - 1];
			const attemptedJoin = `${ currentLine } ${ word }`;

			if ((lines.length > 0) && (attemptedJoin.length <= idealWidth - 4)) {
				lines[lines.length - 1] = attemptedJoin;
			} else {
				lines.push(word);
			}

			return lines;
		}, <string[]>[]);
	}
	// endregion Ascii Text
}
