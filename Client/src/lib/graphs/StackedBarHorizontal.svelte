<script>
	import * as Pancake from '@sveltejs/pancake';
	import { IndexBars } from '$lib/store.ts';
	//Works with const but doesn't re-render as it cannot be modified but does not work with let as it is empty at some point. look up about Svelte and placeholders.

	export const method = ['GET', 'POST', 'PUT', 'DELETE'];
	export const colors = ['lightgreen', 'yellow', 'orange', 'red'];
	let stacks;
	let max;

	let totals = [];

	IndexBars.subscribe((value) => {
		totals = value.slice(0, 10);
		console.log(totals);
		stacks = Pancake.stacks(totals, method, 'id');
		max = stacks.reduce((max, stack) => Math.max(max, ...stack.values.map((v) => v.end)), 0);
	});
</script>

{#if $IndexBars.length > 1}
	<div class="chart">
		<Pancake.Chart x1={0} x2={max} y1={0.5} y2={5.5}>
			<Pancake.Grid horizontal count={totals.length} let:value let:first>
				{#if totals[value - 1]}
					<div class="grid-line horizontal"><span>{totals[value - 1]['route']}</span></div>
				{/if}
			</Pancake.Grid>

			<Pancake.Grid vertical count={8} let:value>
				<div class="grid-line vertical" />
				<span class="x-label">{value}</span>
			</Pancake.Grid>

			{#each stacks as stack, i}
				{#each stack.values as d}
					<Pancake.Box x1={d.start} x2={d.end} y1={d.i - 0.5} y2={d.i + 0.5}>
						<div class="box" style="background-color: {colors[i]}" />
					</Pancake.Box>
				{/each}
			{/each}
		</Pancake.Chart>
	</div>
{/if}

<style>
	.chart {
		height: 100%;
		padding: 0em 0em 3em 10em;
		margin: 0 0 36px 0;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: calc(100% + 3em);
		left: -10em;
	}

	.grid-line.vertical {
		height: 100%;
		border-left: 1px dashed #ccc;
	}

	.grid-line span {
		position: absolute;
		left: 0;
		bottom: -0.5em;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		line-height: 1;
	}

	.x-label {
		position: absolute;
		width: 4em;
		left: -2em;
		bottom: -22px;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		text-align: center;
	}

	.box {
		position: absolute;
		left: 0;
		top: 2px;
		width: 100%;
		height: calc(100% - 4px);
		border-radius: 2px;
	}
</style>
