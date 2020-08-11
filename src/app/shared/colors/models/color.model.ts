import { ColorType } from './color-type.enum';

export class Color {
	private constructor(
		public red: number,
		public green: number,
		public blue: number,
		public alpha: number,
	) { }

	from(red: number, green: number, blue: number, alpha = 255): Color {
		return new Color(red, green, blue, alpha);
	}

	fromString(colorString: string): Color {
		const [red, green, blue, alpha] = this.getColorValues(colorString);
		return this.from(red, green, blue, alpha);
	}

	getColorValues(colorString: string): number[] {
		switch (this.getColorType(colorString)) {
			case ColorType.RGB:
				return this.getRgbColorValues(colorString);
			case ColorType.HEX:
				return this.getHexColorValues(colorString);
		}
	}

	getColorType(colorString: string): ColorType {
		if (colorString.startsWith('rgb')) {
			return ColorType.RGB;
		} else if (colorString.startsWith('#')) {
			return ColorType.HEX;
		}
	}

	/** Gets the RGB color values from an RBG color string
	 * Handles both RGB and RGBA strings
	 * @return [red, green, blue, alpha?]
	 */
	getRgbColorValues(colorString: string): number[] {
		const [colorValesString] = /[\d|\.+?\,?\ *]+/.exec(colorString);
		return colorValesString
			.split(',')
			.map(value => parseFloat(value.trim()));
	}

	/** Gets the RGB color values from an Hex color string
	 * Handles #FFF, #FFFF, #FFFFFF, & #FFFFFFFF type Hex strings
	 * @return [red, green, blue, alpha?]
	 */
	getHexColorValues(colorString: string): number[] {
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

	toString(color: Color): string {
		const { red, green, blue, alpha } = color;
		return (alpha === 255)
			? `rgb(${red}, ${green}, ${blue})`
			: `rgba(${red}, ${green}, ${blue}, ${alpha})`;
	}
}
