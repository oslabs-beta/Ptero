<script>
	import * as Pancake from '@sveltejs/pancake';

	export let split = [];
	export let splitColors = [];
	export let data;
	let stacks;
	let max;

	let totals = [];

	data.subscribe((value) => {
		totals = [];
		let id = 0;
		for (let entry in value) {
			const tempObj = {};
			tempObj['date'] = entry;
			tempObj['total'] = value[entry]['totals'];
			tempObj['id'] = id;
			totals.push(tempObj);
			id++;
		}
		stacks = Pancake.stacks(totals, split, 'date');
		max = stacks.reduce((max, stack) => Math.max(max, ...stack.values.map((v) => v.end)), 0);
	});
</script>

<div class="chart">
	<Pancake.Chart x1={0.5} x2={31.5} y1={0.5} y2={max}>
		<Pancake.Grid vertical count={31} let:value let:first>
			<div class="grid-line vertical"><span>{value}<span /></span></div>
		</Pancake.Grid>

		<Pancake.Grid horizontal count={totals.length} let:value let:first>
			<span class="x-label">{value}</span>
			<!-- <span class="x-label">{value}</span> -->
		</Pancake.Grid>

		{#each stacks as stack, i}
			{#each stack.values as d}
				<Pancake.Box y1={d.start} y2={d.end} x1={parseInt(d.i)} x2={parseInt(d.i) + 0.5}>
					<div class="box" style="background-color: {splitColors[i]}; width:1em" />
				</Pancake.Box>
			{/each}
		{/each}
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 90%;
		padding: 2em 1em 1em 1em;
		margin: 0 0 0px 0;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.vertical {
		height: 100%;
		/* border-right: 1px dashed #ccc; */
	}

	.grid-line span {
		position: absolute;
		left: 0em;
		bottom: -2em;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		/* line-height: 1; */
		/* width: 11em; */
		overflow-wrap: break-word;
		/* text-align:right; */
	}

	.x-label {
		position: absolute;
		width: 4em;
		left: -2.5em;
		bottom: -22px;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		text-align: center;
	}

	.box {
		position: absolute;
		/* left: 0.5em; */
		top: -1em;
		/* width: 1em; */
		height: calc(100% - 4px);
		border-radius: 2px;
		padding: 2px;
	}
</style>
