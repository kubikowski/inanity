import { AboutCardData } from 'src/app/features/about/models/about-card-data.interface';

export const aboutCardData: readonly AboutCardData[] = [
	{
		title: 'NATHANIEL HOLDEN',
		image: {
			src: 'assets/images/climbing_the_castle.jpg',
			alt: 'climbing the face of the castle',
		},
	},
	{
		title: 'ABOUT',
		content: [
			{
				title: 'name',
				value: 'Nathaniel Holden',
			},
			{
				title: 'title',
				value: 'Software Engineer',
			},
			{
				title: 'location',
				value: 'Denver, CO',
			},
		],
	},
	{
		title: 'CONTACT',
		content: [
			{
				title: 'email',
				value: 'holden@inanity.io',
				linked: true,
			},
		],
	},
];
