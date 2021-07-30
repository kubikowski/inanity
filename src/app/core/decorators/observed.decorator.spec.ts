import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Observed } from 'src/app/core/decorators/observed.decorator';
import { SubSink } from 'subsink';

const testValue1 = 10;
const testValue2 = 25;
const testValue3 = 50;

class TestClass {
	@Observed() property = testValue1;
	readonly property$: Observable<number>;
}

class TestClassNoDefaults {
	@Observed() property;
	readonly property$: Observable<any>;
}

describe('Observed decorator', () => {

	let subscriptions: SubSink;

	beforeEach(() => {
		subscriptions = new SubSink();
	});

	afterEach(() => {
		subscriptions.unsubscribe();
	});

	it('should hold distinct data for each class instance', () => {
		const classA = new TestClass();
		const classB = new TestClass();

		const checkObservable = classX => {
			subscriptions.sink = classX.property$.pipe(take(1))
				.subscribe(property => { expect(property).toEqual(classX.property); });
		};

		expect(classA.property).toEqual(testValue1);
		expect(classB.property).toEqual(testValue1);
		checkObservable(classA);
		checkObservable(classB);

		classA.property = testValue2;

		expect(classA.property).toEqual(testValue2);
		expect(classB.property).toEqual(testValue1);
		checkObservable(classA);
		checkObservable(classB);

		classB.property = testValue3;

		expect(classA.property).toEqual(testValue2);
		expect(classB.property).toEqual(testValue3);
		checkObservable(classA);
		checkObservable(classB);
	});

	it('should still work properly if no defaults are specified', () => {
		const classA = new TestClassNoDefaults();
		const classB = new TestClassNoDefaults();

		const checkObservable = classX => {
			subscriptions.sink = classX.property$.pipe(take(1))
				.subscribe(property => { expect(property).toEqual(classX.property); });
		};

		expect(classA.property).toBeUndefined();
		expect(classA.property$).toBeUndefined();
		expect(classB.property).toBeUndefined();
		expect(classB.property$).toBeUndefined();

		classA.property = testValue1;

		expect(classA.property).toEqual(testValue1);
		checkObservable(classA);
		expect(classB.property).toBeUndefined();
		expect(classB.property$).toBeUndefined();

		classB.property = testValue2;

		expect(classA.property).toEqual(testValue1);
		expect(classB.property).toEqual(testValue2);
		checkObservable(classA);
		checkObservable(classB);

		classA.property = testValue3;
		classB.property = testValue1;

		expect(classA.property).toEqual(testValue3);
		expect(classB.property).toEqual(testValue1);
		checkObservable(classA);
		checkObservable(classB);
	});
});
