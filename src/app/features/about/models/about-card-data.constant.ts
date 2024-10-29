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
		title: 'INANITY',
		paragraphs: [
			'<b>noun:</b>',
			'The quality or state of being inane.',
			'<i>a.</i> vapid, pointless, and lacking substance',
			'<i>b.</i> shallow and silly',
		],
	},
	{
		title: '',
		paragraphs: [
			'This website is my personal code playground.',
			'It is intended to be playful.',
			`Whoever you are, whenever you're reading this. The website is probably incomplete.
			Most likely, some scheme I had fell through. And there are still traces of it left floating around.`,
			'But hey',
			'☕ If you like it, dont buy me a coffee!',
			'Save your $5 and write me an email!',
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
