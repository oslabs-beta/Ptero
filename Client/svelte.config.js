import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';
// import pkg from './package.json';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	// Consult https://github.com/sveltejs/svelte-preprocess
// 	// for more information about preprocessors
// 	preprocess: preprocess(),

// 	kit: {
// 		// hydrate the <div id="svelte"> element in src/app.html
// 		target: '#svelte',

// 		// vite: {
// 		// 	ssr: {
// 		// 		// external: Object.keys(pkg.Dependencies || {})
// 		// 	}
// 		// }
// 	}
// };

export default {
	kit: {
		target: '#svelte',
		adapter: adapter({
			// default options are shown
			out: 'build',
			precompress: false,
			env: {
				host: 'HOST',
				port: 'PORT'
			}
		})
	}
};
