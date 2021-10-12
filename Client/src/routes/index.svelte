<script context="module">
	import Graph1 from '$lib/graphs/graph1.svelte';
	import Card from '$lib/graphs/card.svelte';
	// import Log from '$lib/db.ts';
	// import { each } from 'svelte/internal';

	// Log.find().then((data) => console.log(data));
</script>

<section>
	<div class="overviewWindow">
		<div class="widget">
			<!-- {#each logs as log}
				 <h3> {log} </h3>
			{/each} -->
		</div>
		<div class="widgetNumbers">
			<div class="numbers">
				<Card cardValue={30} color={'orange'} />
			</div>
			<div class="numbers">
				<Card cardValue={230} color={'red'} />
			</div>
			<div class="numbers">
				<Card cardValue={3} color={'green'} />
			</div>
		</div>
		<div class="widget">
			<h1>Requests per endpoint</h1>
			<Graph1 />
		</div>
		<div class="widget" />
	</div>
</section>

<style>
	section {
		display: flex;
		align-items: stretch;
		justify-content: stretch;
		flex-grow: 1;
		width: 100%;
	}
	.overviewWindow {
		flex-grow: 1;
		padding: 2em;
		gap: 2em;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr 2fr;
		grid-auto-columns: max-content;
	}
	.widget {
		background-color: var(--bs-dark);
	}
	.widget h1 {
		text-align: center;
	}
	.widgetNumbers {
		background-color: var(--bs-dark);
		display: flex;
		justify-content: stretch;
		align-content: stretch;
		padding: 1em;
		gap: 1em;
	}
	.numbers {
		flex-grow: 1;
		/* background-color: var(--bs-light); */
	}
</style>
