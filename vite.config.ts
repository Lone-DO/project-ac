import { fileURLToPath, URL } from 'node:url';
import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import config from './src/assets/common/config';

// https://vite.dev/config/
export default defineConfig(async ({ mode }): Promise<UserConfig> => {
	await config.init(mode);
	let base = '/';
	if (mode === 'production') base = '/project-animalcrossing/';
	else if (mode === 'plugin') base = '/project-animalcrossing/dist/';
	return {
		base,
		esbuild: {
			// Remove debugger statements in production
			drop: mode === 'production' ? ['debugger'] : [],
		},
		server: {
			port: 8082,
		},
		plugins: [react()],
		build: {
			emptyOutDir: true,
			minify: false,
			sourcemap: true,
			rollupOptions: {
				output: {
					name: 'react-portfolio',
					entryFileNames: (chunk) => `${[chunk.name]}.js`,
				},
			},
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		css: {
			devSourcemap: true,
			preprocessorOptions: {
				scss: {
					sourceMapIncludeSources: true,
				},
			},
		},
	};
});
