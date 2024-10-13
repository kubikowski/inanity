export class DyslexicWord {
	private constructor(
		private readonly word: string,
		private readonly firstLetter: string | undefined,
		private readonly lastLetter: string | undefined,
		private readonly middleLetters: string,
	) { }

	public static from(word: string): DyslexicWord {
		const orderedLetters: string[] = word.split('');

		const firstLetter = orderedLetters.shift();
		const lastLetter = orderedLetters.pop();
		const middleLetters = orderedLetters.join('');

		return new DyslexicWord(word, firstLetter, lastLetter, middleLetters);
	}

	public get combinations(): readonly string[] {
		const allCombinations = [ this.word ];

		for (let movingDistance = 0; movingDistance < this.middleLetters.length - 1; movingDistance++) {
			const combinations = this.getCombinationsByMovingDistance(movingDistance);

			allCombinations.push(...combinations);
		}

		return allCombinations;
	}

	private getCombinationsByMovingDistance(movingDistance: number): readonly string[] {
		const combinations = [];

		for (let movingLetterIndex = 0; movingLetterIndex < this.middleLetters.length - movingDistance - 1; movingLetterIndex++) {
			const combination = this.getCombination(movingLetterIndex, movingDistance);

			combinations.push(combination);
		}

		return combinations;
	}

	private getCombination(movingLetterIndex: number, movingDistance: number): string {
		const startingLetters = this.middleLetters.slice(0, movingLetterIndex);
		const endingLetters = this.middleLetters.slice(movingLetterIndex + movingDistance + 2);

		const forwardLetter = this.middleLetters.charAt(movingLetterIndex);
		const backwardLetters = this.middleLetters.slice(movingLetterIndex + 1, movingLetterIndex + movingDistance + 2);

		return this.firstLetter + startingLetters + backwardLetters + forwardLetter + endingLetters + this.lastLetter;
	}
}
