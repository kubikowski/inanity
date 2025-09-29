import { snakeCase } from 'src/app/core/functions/string/snake-case.function';

export enum AnonymousAnimal {
	ALLIGATOR = 'ALLIGATOR',
	ARMADILLO = 'ARMADILLO',
	AXOLOTL = 'AXOLOTL',
	BAT = 'BAT',
	BLOBFISH = 'BLOBFISH',
	BUFFALO = 'BUFFALO',
	CAPYBARA = 'CAPYBARA',
	CHAMELEON = 'CHAMELEON',
	CORMORANT = 'CORMORANT',
	DOLPHIN = 'DOLPHIN',
	DUCK = 'DUCK',
	DUMBO_OCTOPUS = 'DUMBO_OCTOPUS',
	ELEPHANT = 'ELEPHANT',
	FERRET = 'FERRET',
	GOOSE = 'GOOSE',
	HEDGEHOG = 'HEDGEHOG',
	HYENA = 'HYENA',
	IBEX = 'IBEX',
	IGUANA = 'IGUANA',
	KANGAROO = 'KANGAROO',
	KIWI = 'KIWI',
	KOALA = 'KOALA',
	KRAKEN = 'KRAKEN',
	LEMUR = 'LEMUR',
	LLAMA = 'LLAMA',
	MANATEE = 'MANATEE',
	MINK = 'MINK',
	MOOSE = 'MOOSE',
	NARWHAL = 'NARWHAL',
	PANDA = 'PANDA',
	PENGUIN = 'PENGUIN',
	PLATYPUS = 'PLATYPUS',
	RACCOON = 'RACCOON',
	RHINO = 'RHINO',
	SHEEP = 'SHEEP',
	SHREW = 'SHREW',
	SLOW_LORIS = 'SLOW_LORIS',
	TURTLE = 'TURTLE',
	WALRUS = 'WALRUS',
	WOMBAT = 'WOMBAT',
}

export abstract class AnonymousAnimalUtil {
	public static readonly namespace = 'animal';

	public static random(): AnonymousAnimal {
		const anonymousAnimals = Object.values(AnonymousAnimal);
		const randomIndex = Math.floor(Math.random() * anonymousAnimals.length);
		return anonymousAnimals[randomIndex]!;
	}

	public static getIcon(animal: AnonymousAnimal): string {
		return `${ this.namespace }:${ snakeCase(animal) }`;
	}
}
