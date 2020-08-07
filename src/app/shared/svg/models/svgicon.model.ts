import { BehaviorSubject, Observable } from 'rxjs';
import { IconName } from './icon-name.enum';
import { IconFile } from './icon-file.enum';

export class SVGIcon {
	private readonly elementSubject: BehaviorSubject<SVGElement>;
	public readonly element$: Observable<SVGElement>;

	public requested: boolean;

	public constructor(
		public readonly iconName: IconName,
		public readonly fileName: IconFile,
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
