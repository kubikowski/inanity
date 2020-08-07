import { BehaviorSubject, Observable } from 'rxjs';

export class SVGIcon {
	private readonly elementSubject: BehaviorSubject<SVGElement>;
	public readonly element$: Observable<SVGElement>;

	public requested: boolean;

	public constructor(
		public iconName: string,
		public fileName: string,
	) {
		this.elementSubject = new BehaviorSubject<SVGElement>(null);
		this.element$ = this.elementSubject.asObservable();

		this.requested = false;
	}

	get element(): SVGElement {
		return this.elementSubject.getValue();
	}

	set element(icon: SVGElement) {
		this.elementSubject.next(icon);
	}
}
