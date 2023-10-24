import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from '@sveltejs/kit/vite';
import WindiCSS from 'vite-plugin-windicss';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sentrySvelteKit({
        sourceMapsUploadOptions: {
            org: "nthumods",
            project: "ctldsys"
        }
    }), sveltekit(), WindiCSS()]
});