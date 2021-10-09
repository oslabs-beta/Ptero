<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	var data = [30, 86, 168, 281, 303, 365];

	let el;
	onMount(() => {
		d3.select(el)
			.selectAll('div')
			.data(data)
			.enter()
			.append('div')
			.style('width', function (d) {
				return d + 'px';
			})
			.text(function (d) {
				return d;
			});
	});

	let data2 = [
		{ x: 10, r: 5 },
		{ x: 30, r: 10 },
		{ x: 50, r: 15 },
		{ x: 70, r: 20 },
		{ x: 90, r: 25 }
	];
</script>

<section>
	<h1>Graphs 1 Page</h1>
	<svg>
		{#each data2 as d}
			<circle cx={d.x + '%'} cy="50%" r={d.r} fill="white" />
		{/each}
	</svg>
	<div bind:this={el} class="chart" />
</section>

<style>
	.chart :global(div) {
		font: 10px sans-serif;
		background-color: steelblue;
		text-align: right;
		padding: 3px;
		margin: 1px;
		color: white;
	}
</style>
