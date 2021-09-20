export interface AboutCardData {
	title: string;

	image?: {
		src: string;
		alt: string;
	};

	content?: {
		title: string;
		value: string;
		linked?: boolean;
	}[];
}
