import { AboutCardData } from 'src/app/features/about/models/about-card-data.interface';

export const aboutCardData: readonly AboutCardData[] = [
	{
		title: 'Nathaniel Holden',
		image: {
			src: 'assets/images/glacier_sunset.jpg',
			alt: 'Glacier National Park, some time around sunset',
			width: 4000,
			height: 3000,
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
			width: 4096,
			height: 3072,
		},
	},
	{
		title: '',
		paragraphs: [
			'This website is my personal code sandbox. It is intended to be playful.',
			`I’m an engineer, and here I am overengineering a whimsical disasterpiece.
			And in all the wrong ways too, because I fundamentally don’t know what I’m doing.`,
			`Its a work in progress. It always will be.
			As you read this, the website is probably littered with traces of unfinished features.`,
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
