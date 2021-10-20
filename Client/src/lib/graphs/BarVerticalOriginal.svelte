<script>
	import * as Pancake from '@sveltejs/pancake';

	export let color;
	export let data;
	let stacks;
	let max;

	let totals = [];

	data.subscribe((value) => {
		totals = value.slice(0, 10);
		stacks = Pancake.stacks(totals, split, 'id');
		max = stacks.reduce((max, stack) => Math.max(max, ...stack.values.map((v) => v.end)), 0);
	});
</script>

<div class="chart">
	<Pancake.Chart x1={0.5} x2={10.5} y1={0.5} y2={max}>
		<Pancake.Grid vertical count={totals.length} let:value let:first>
			<div class="grid-line vertical"><span>{totals[10 - value]['route']}</span></div>
		</Pancake.Grid>

		<Pancake.Grid horizontal count={totals.length} let:value let:first>
			<span class="x-label">{value}</span>
			<!-- <span class="x-label">{value}</span> -->
		</Pancake.Grid>

		{#each stacks as stack, i}
			{#each stack.values as d}
				<Pancake.Box y1={d.start} y2={d.end} x1={11 - d.i - 0.5} x2={11 - d.i + 0.5}>
					<div class="box" style="background-color: {splitColors[i]}" />
				</Pancake.Box>
			{/each}
		{/each}
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 100%;
		padding: 0em 1em 3em 1em;
		margin: 0 0 36px 0;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: calc(100% + 3em);
		left: -10em;
		/* display: flex; */
		/* border-top: 1px dashed #ccc; */
	}

	.grid-line.vertical {
		height: 100%;
		border-right: 1px dashed #ccc;
	}

	.grid-line span {
		position: absolute;
		left: -5em;
		bottom: -2em;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		line-height: 1;
		width: 11em;
		overflow-wrap: break-word;
		/* text-align:right; */
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
