import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		host: '0.0.0.0',
		port: 3000,
		allowedHosts: ['tasker.shoro.kg', 'localhost', '0.0.0.0'],
		cors: {
			origin: ['http://localhost:3000', 'https://tasker.shoro.kg'],
		},
	},
	preview: {
		host: '0.0.0.0',
		port: 3000,
		allowedHosts: ['tasker.shoro.kg', 'localhost', '0.0.0.0'],
		cors: {
			origin: ['http://localhost:3000', 'https://tasker.shoro.kg'],
		},
	},
});
