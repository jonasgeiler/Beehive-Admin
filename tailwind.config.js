module.exports = {
	theme:    {
		extend: {
			colors: {
				primary: '#e2Ae0f'
			},
			minHeight: {
				'40': '10rem',
				'56': '14rem'
			},
			inset: {
				'25': '6.25rem',
				'31': '7.75rem'
			},
			screens: {
				'xs': '464px'
			},
		},
	},
	variants: {},
	purge:    {
		content: ['./src/**/*.svelte', './src/**/*.html'],
		options: {
			safelist: [/svelte-/],

			defaultExtractor: (content) => {
				const regExp = new RegExp(/[A-Za-z0-9-_:/]+/g);
				const matchedTokens = [];
				let match = regExp.exec(content);
				while (match) {
					if (match[0].startsWith('class:')) {
						matchedTokens.push(match[0].substring(6));
					} else {
						matchedTokens.push(match[0]);
					}
					match = regExp.exec(content);
				}
				return matchedTokens;
			},
		},
	},
	plugins:  [],
};
