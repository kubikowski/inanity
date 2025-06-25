import { AboutCardData } from 'src/app/features/about/models/about-card-data.interface';

export const aboutCardData: readonly AboutCardData[] = [
	{
		title: 'Nathaniel Holden',
		image: {
			src: 'assets/images/glacier_sunset.jpg',
			alt: 'Glacier National Park, some time around sunset',
		},
	},
	{
		title: 'Author',
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
		title: 'Inanity',
		paragraphs: [
			`<b>Noun:</b>
			<br>The quality or state of being inane.`,
			`&emsp;<i>a.</i>&ensp; vapid, pointless, & lacking substance
			<br>&emsp;<i>b.</i>&ensp; shallow & silly`,
		],
	},
	{
		title: 'Headquarters',
		image: {
			src: 'assets/images/los_angeles_sunset.jpg',
			alt: 'Angeles Crest, looking out over the city',
		},
	},
	{
		title: '',
		paragraphs: [
			'This website acts as my personal code sandbox. It is intended to be playful.',
			`Whoever you are, whenever you’re reading this. The website is probably incomplete.
			Most likely, some scheme I had fell through. And there are still traces of it left floating around.`,
			`And hey, if you like it, you can buy me a coffee! To do that, write me an email.
			Then we can meet in person, and you can buy me a coffee!`,
		],
	},
	{
		title: 'Contact',
		content: [
			{
				title: 'email',
				value: 'holden@inanity.io',
				linked: true,
			},
			{
				title: 'socials',
				value: '<small><i>nope.</i></small>',
			},
		],
	},
];
