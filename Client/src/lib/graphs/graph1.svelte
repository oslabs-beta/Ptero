<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	var data = [86, 3, 281, 303, 365, 45, 100, 230, 325, 400, 30, 168, 250, 600];

	let el;
	onMount(() => {
		d3.select(el)
			.selectAll('div')
			.data(
				data
					.sort((a, b) => {
						return a - b;
					})
					.reverse()
			)
			.enter()
			.append('div')
			.style('width', function (d) {
				return d + 'px';
			})
			.text(function (d) {
				return d;
			});
	});
</script>

<section>
	<!-- <svg>
		{#each data2 as d}
			<circle cx={d.x + '%'} cy="50%" r={d.r} fill="white" />
		{/each}
	</svg> -->
	<div bind:this={el} class="chart" />
</section>

<style>
	.chart :global(div) {
		font: 1rem sans-serif;
		background-color: steelblue;
		text-align: right;
		padding: 3px;
		margin: 1px;
		color: white;
	}
</style>
