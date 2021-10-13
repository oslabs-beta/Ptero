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
