import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export type BracePair = readonly [ string, string ];

export const bracePairs: readonly BracePair[] = [
	/* ascii */
	[ '(', ')' ],
	[ '[', ']' ],
	[ '{', '}' ],

	/* typography */
	[ '«', '»' ],

	/* arrows */
	[ '→', '←' ],
	[ '⇒', '⇐' ],
	[ '↦', '↤' ],
	[ '↠', '↞' ],
	[ '⇀', '↽' ],

	/* maths */
	[ '⟨', '⟩' ],
	[ '⟪', '⟫' ],
	// Commenting these out for general lack of font support
	// [ '⟦', '⟧' ],
	// [ '⟮', '⟯' ],
	// [ '⟬', '⟭' ],
];

export abstract class Braces {
	public static random$(): Observable<BracePair> {
		return timer(0, 2000).pipe(map(() => this.random()));
	}

	public static random(): BracePair {
		return bracePairs[ Math.floor(Math.random() * bracePairs.length) ] as BracePair;
	}
}
