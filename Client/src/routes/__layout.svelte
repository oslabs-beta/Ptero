<script>
	import '../../global.css';
	import Navbar from '$lib/navbar.svelte';
	import { onMount } from 'svelte';
	import { logs } from '$lib/store.ts';

	onMount(async () => {
		fetch('localhost:3000/Log')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				logs.set(data);
			})
			.catch((error) => {
				console.log(error);
				return [];
			});
	});
</script>

<main>
	<Navbar />
	<slot />
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		height: 100vh;
		background-image: url('../background.jpg');
	}
	slot {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
	}
</style>
