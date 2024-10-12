import { AboutCardData } from 'src/app/features/about/models/about-card-data.interface';

export const aboutCardData: readonly AboutCardData[] = [
	{
		title: 'NATHANIEL HOLDEN',
		image: {
			src: 'assets/images/glacier_sunset.jpg',
			alt: 'Glacier National Park, some time around sunset',
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
				value: 'Senior Software Engineer',
			},
			{
				title: 'location',
				value: 'Los Angeles, CA',
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
