export default {
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Inter Variable',
					'Source Han Sans TC Variable',
					'Source Han Sans JP Variable',
					'Source Han Sans KR Variable'
				],
				serif: [
					'Source Han Serif TC Variable',
				],
				display: [
					'Quicksand Variable',
					'Source Han Sans TC Variable',
				]
			},
			colors: {
				c1: '#CDD2E2',
				c2: '#F5F6F9',
				c3: '#FFFFFF',
			}
		}
	},
	variants: {
		scrollbar: ['rounded']
	},
	plugins: [
		require('windicss/plugin/aspect-ratio'),
		require('@windicss/plugin-scrollbar'),
	]
};	