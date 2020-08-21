import * as ColorName from 'color-name';

export class InvalidColorError extends Error {}

export class Color {
	private constructor(
		public red: number,
		public green: number,
		public blue: number,
		public alpha: number,
	) { }

	/** region Static Factory Methods */
	public static from(red: number, green: number, blue: number, alpha = 255): Color {
		return new Color(red, green, blue, alpha);
	}

	public static fromString(colorString: string): Color {
		const [red, green, blue, alpha] = this.getColorValues(colorString);
		return this.from(red, green, blue, alpha);
	}

	/** Infers the Color Type of colorString from its leading characters
	 * @return result of the respective get{Color Type}ColorValues method
	 */
	private static getColorValues(colorString: string): number[] {
		if (colorString.startsWith('rgb')) {
			return this.getRgbColorValues(colorString);
		} else if (colorString.startsWith('#')) {
			return this.getHexColorValues(colorString);
		} else if (ColorName[colorString] instanceof Array){
			return ColorName[colorString];
		} else {
			throw new InvalidColorError(colorString);
		}
	}

	/** Gets the RGB color values from an RBG color string
	 * Handles both RGB and RGBA strings
	 * @return [red, green, blue, alpha?]
	 */
	private static getRgbColorValues(colorString: string): number[] {
		const [colorValesString] = /[\d|\.+?\,?\ *]+/.exec(colorString);
		const colorValues = colorValesString.split(',')
			.map(value => parseFloat(value));

		if (colorValues.length === 3 || colorValues.length === 4) {
			return colorValues;
		} else {
			throw new InvalidColorError(colorString);
		}
	}

	/** Gets the RGB color values from an Hex color string
	 * Handles #FFF, #FFFF, #FFFFFF, & #FFFFFFFF type Hex strings
	 * @return [red, green, blue, alpha?]
	 */
	private static getHexColorValues(colorString: string): number[] {
		const [hexValuesString] = /[\d|a-f|A-F+?]+/.exec(colorString);
		switch (hexValuesString.length) {
			case 3:
				return getSingleHexColorValues(hexValuesString);
			case 4: {
				const [alpha, red, green, blue] = getSingleHexColorValues(hexValuesString);
				return [red, green, blue, alpha];
			}
			case 6:
				return getDoubleHexColorValues(hexValuesString);
			case 8: {
				const [alpha, red, green, blue] = getDoubleHexColorValues(hexValuesString);
				return [red, green, blue, alpha];
			}
			default:
				throw new InvalidColorError(colorString);
		}

		function getSingleHexColorValues(hexString: string): number[] {
			return hexString.split('')
				.map(value => parseInt(`${value}${value}`, 16));
		}

		function getDoubleHexColorValues(hexString: string): number[] {
			return hexString.match(/.{1,2}/g)
				.map(value => parseInt(value, 16));
		}
	}
	/** endregion Static Factory Methods */

	/** Object.toString() override */
	public toString(): string {
		const { red, green, blue, alpha } = this;
		return (alpha === 255)
			? `rgb(${red}, ${green}, ${blue})`
			: `rgba(${red}, ${green}, ${blue}, ${alpha})`;
	}

	/** Creates a new Color from the original with an overlaid alpha value
	 * @param alpha - new alpha value
	 */
	public withAlpha(alpha: number): Color {
		const { red, green, blue } = this;
		return Color.from(red, green, blue, alpha);
	}

	/** Creates an opaque Color from this color (with alpha) over the theme background color.
	 * @param backgroundColor - the theme background color, (if provided, it's alpha will be ignored)
	 */
	public imposeOn(backgroundColor: Color): Color {
		const alphaFloat = this.getAlphaFloatValue();

		return Color.from(
			calculateTargetHue(backgroundColor.red, this.red, alphaFloat),
			calculateTargetHue(backgroundColor.green, this.green, alphaFloat),
			calculateTargetHue(backgroundColor.blue, this.blue, alphaFloat),
		);

		function calculateTargetHue(backgroundHue: number, foregroundHue: number, alpha: number): number {
			return Math.floor(((1 - alpha) * backgroundHue) + (alpha * foregroundHue));
		}
	}

	private getAlphaFloatValue(): number {
		return (this.alpha > 1)
			? this.alpha / 255
			: this.alpha;
	}
}
