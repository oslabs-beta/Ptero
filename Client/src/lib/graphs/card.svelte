<script>
	export let cardValue;
	export let color;
</script>

<div class="card" style="--color:{color}">
	{cardValue}
</div>

<style>
	.card {
		background-color: var(--bs-dark);
		color: var(--color);
		height: 100%;
		font-size: 5em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: 2px 2px 10px black;
	}
</style>
