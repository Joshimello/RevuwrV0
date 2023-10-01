import { sveltekit } from '@sveltejs/kit/vite';
import WindiCSS from 'vite-plugin-windicss';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), WindiCSS()]
});
