import preprocess from 'svelte-preprocess';
// import pkg from './package.json';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'

		// vite: {
		// 	ssr: {
		// 		// external: Object.keys(pkg.Dependencies || {})
		// 	}
		// }
	}
};

export default config;
