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
				primary: '#5755FF',
				secondary: '#FF8F6B',
				tertiary: '#FEB63D'
			}
		}
	},
	plugins: [require('windicss/plugin/aspect-ratio')]
};
