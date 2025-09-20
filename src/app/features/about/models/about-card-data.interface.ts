export interface AboutCardData {
	readonly title: string;

	readonly image?: {
		readonly src: string;
		readonly alt: string;
		readonly width: number;
		readonly height: number;
	};

	readonly content?: {
		readonly title: string;
		readonly value: string;
		readonly linked?: boolean;
	}[];

	readonly paragraphs?: string[];
}
