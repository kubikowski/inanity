import colorName from 'color-name';
import { clamp } from 'src/app/core/functions/number/clamp.function';

type RGB = [ number, number, number, number? ];
type RGBA = [ number, number, number, number ];

export class InvalidColorString extends Error {
	public constructor(message?: string) {
		super(message);
		this.name = 'Invalid Color String';
	}
}

export class Color {
	/** Constructs Immutable Color Object */
	private constructor(
		private readonly red: number,
		private readonly green: number,
		private readonly blue: number,
		private readonly alpha: number,
	) { }

	/* region Static Factory Methods */
	/** Static Factory Constructor from pixel intensities and opacity
	 * @param red - int in range(0, 255) representing the red pixel intensity
	 * @param green - int in range(0, 255) representing the green pixel intensity
	 * @param blue - int in range(0, 255) representing the blue pixel intensity
	 * @param alpha - float in range(0, 1) representing opacity, default = 1
	 * @return a new Color object
	 */
	private static from(red: number, green: number, blue: number, alpha = 1): Color {
		return new Color(
			scrubHue(red),
			scrubHue(green),
			scrubHue(blue),
			scrubAlpha(alpha),
		);

		function scrubHue(rawHue: number): number {
			return Math.round(clamp(0, rawHue, 255));
		}

		function scrubAlpha(rawAlpha: number): number {
			return clamp(0, rawAlpha, 1);
		}
	}

	/** Constructs a Color from an input colorString, as it would be used in CSS
	 * @param colorString - Can be of RGB or Hex types, or an HTML named color.
	 *                <br/> Note: HSL types are specifically unsupported.
	 * @return a new Color object
	 * @throws InvalidColorString
	 */
	public static fromString(colorString: string): Color {
		const [ red, green, blue, alpha ] = this.getColorValues(colorString);
		return this.from(red, green, blue, alpha);
	}

	/** Infers the Color Type of colorString from its leading characters
	 * @return result of the respective get{Color Type}ColorValues method
	 * @throws InvalidColorString
	 */
	private static getColorValues(colorString: string): RGB {
		if (colorString.startsWith('rgb')) {
			return this.getRgbColorValues(colorString);
		} else if (colorString.startsWith('#')) {
			return this.getHexColorValues(colorString);
		} else {
			return this.getNamedColorValues(colorString);
		}
	}

	/** Gets the RGB color values from an RBG color string
	 * <br/> Handles both RGB and RGBA strings
	 * @return [red, green, blue, alpha?]
	 * @throws InvalidColorString
	 */
	private static getRgbColorValues(colorString: string): RGB {
		const [ colorValuesString ] = /[\d%.+?, *]+/.exec(colorString) ?? [];
		const colorValues: RGB = colorValuesString?.split(',')
			.map((value, index) => convertToNumber(value, index)) as RGB ?? [];

		if (colorValues.length === 3 || colorValues.length === 4) {
			return colorValues;
		} else {
			throw new InvalidColorString(colorString);
		}

		function convertToNumber(colorValueString: string, index: number): number {
			if (colorValueString.includes('%')) {
				const rawPercentage = parseFloat(colorValueString) / 100;
				return (index < 3) ? rawPercentage * 255 : rawPercentage;
			} else {
				return parseFloat(colorValueString);
			}
		}
	}

	/** Gets the RGB color values from a Hex color string
	 * <br/> Handles #FFF, #FFFF, #FFFFFF, & #FFFFFFFF type Hex strings
	 * @return [red, green, blue, alpha?]
	 * @throws InvalidColorString
	 */
	private static getHexColorValues(colorString: string): RGB {
		const [ hexValuesString ] = /[\da-fA-F+?]+/.exec(colorString) ?? [];
		switch (hexValuesString?.length) {
			case 3:
				return getSingleHexColorValues(hexValuesString);
			case 4: {
				const [ alpha, red, green, blue ] = getSingleHexColorValues(hexValuesString) as RGBA;
				return [ red, green, blue, alpha / 255 ];
			}
			case 6:
				return getDoubleHexColorValues(hexValuesString);
			case 8: {
				const [ alpha, red, green, blue ] = getDoubleHexColorValues(hexValuesString) as RGBA;
				return [ red, green, blue, alpha / 255 ];
			}
			default:
				throw new InvalidColorString(colorString);
		}

		function getSingleHexColorValues(hexString: string): RGB {
			return hexString.split('')
				.map(value => parseInt(`${ value }${ value }`, 16)) as RGB;
		}

		function getDoubleHexColorValues(hexString: string): RGB {
			return (hexString.match(/.{1,2}/g) as RegExpExecArray)
				.map(value => parseInt(value, 16)) as RGB;
		}
	}

	/** Gets the RGBA color values from an HTML named color string
	 * @return [red, green, blue, alpha?]
	 * @throws InvalidColorString
	 * @see https://github.com/colorjs/color-name
	 */
	private static getNamedColorValues(colorString: string): RGB {
		const _colorName = (colorName as Record<string, RGB | undefined>)[ colorString ];
		if (_colorName instanceof Array) {
			return _colorName;
		} else if (colorString === 'transparent') {
			return [ 0, 0, 0, 0 ];
		} else {
			throw new InvalidColorString(colorString);
		}
	}
	/* endregion Static Factory Methods */

	/* region Object Prototype Methods */
	/** Color object.toString() override
	 * @return an RGB type colorString or 'transparent' for colors with opacity 0
	 */
	public toString(): string {
		const { red, green, blue, alpha } = this;
		switch (alpha) {
			case 0:
				return 'transparent';
			case 1:
				return `rgb(${ red }, ${ green }, ${ blue })`;
			default:
				return `rgba(${ red }, ${ green }, ${ blue }, ${ alpha })`;
		}
	}

	/** Creates a new Color from the original with an overlaid alpha value
	 * @param alpha - new alpha value
	 * @return a new Color object
	 */
	public withAlpha(alpha: number): Color {
		const { red, green, blue } = this;
		return Color.from(red, green, blue, alpha);
	}

	/** Creates a new opaque Color from this color (with alpha) imposed on a background color.
	 * @param backgroundColor - the theme background color, (if provided, it's alpha will be ignored)
	 * @return a new Color object
	 */
	public imposeOn(backgroundColor: Color): Color {
		return Color.from(
			calculateTargetHue(backgroundColor.red, this.red, this.alpha),
			calculateTargetHue(backgroundColor.green, this.green, this.alpha),
			calculateTargetHue(backgroundColor.blue, this.blue, this.alpha),
		);

		function calculateTargetHue(backgroundHue: number, foregroundHue: number, alpha: number): number {
			return ((1 - alpha) * backgroundHue) + (alpha * foregroundHue);
		}
	}
	/* endregion Object Prototype Methods */
}
