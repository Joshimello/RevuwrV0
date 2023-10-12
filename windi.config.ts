export default {
	// plugins: [require("daisyui")],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Inter Variable',
					'Source Han Sans TC Variable',
					'Source Han Sans JP Variable',
					'Source Han Sans KR Variable'
				]
			},
			colors: {
				c1: '#CDD2E2',
			}
		}
	},
	plugins: [require('windicss/plugin/aspect-ratio')]
};
