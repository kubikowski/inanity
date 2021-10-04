export namespace ClockUtil {
	export function getStartTime(): Date {
		const hours = Math.floor(Math.random() * 24);
		const minutes = Math.floor(Math.random() * 60);
		const seconds = Math.floor(Math.random() * 60);

		return new Date(new Date().setHours(hours, minutes, seconds));
	}

	export function countDown(date: Date): Date {
		const seconds = Math.floor(Math.random() * 60 * 1000);

		return new Date(date.getTime() - seconds);
	}
}
