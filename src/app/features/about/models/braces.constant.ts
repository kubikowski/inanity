import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export type BracePair = [ string, string ];

export const bracePairs: readonly BracePair[] = [
	/* ascii */
	[ '(', ')' ],
	[ '[', ']' ],
	[ '{', '}' ],

	/* arrows */
	[ '→', '←' ],
	[ '⇒', '⇐' ],
	[ '↦', '↤' ],
	[ '⤇', '⤆' ],

	/* maths */
	[ '⟦', '⟧' ],
	[ '⟨', '⟩' ],
	[ '⟪', '⟫' ],
	[ '⟮', '⟯' ],
	[ '⟬', '⟭' ],
];

export abstract class Braces {
	public static random$(): Observable<BracePair> {
		return timer(0, 1000).pipe(map(() => this.random()));
	}

	public static random(): BracePair {
		return bracePairs[ Math.floor(Math.random() * bracePairs.length) ] as BracePair;
	}
}
