<script>
	import '../../global.css';
	import Navbar from '$lib/navbar.svelte';
</script>

<main>
	<Navbar />
	<slot />
</main>

<style>
	main {
		color: whitesmoke;
		background-color: rgb(47, 47, 47);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
		height: 100%;
		width: 100%;
		/* background-color: orangered; */
	}
</style>
