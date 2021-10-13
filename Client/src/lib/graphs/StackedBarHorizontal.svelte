<script>
	import * as Pancake from '@sveltejs/pancake';

	export const totals = [
		{ route: '/test', GET: 3840, POST: 1920, PUT: 960, DELETE: 400, id: 1 },
		{ route: '/test/api', GET: 1600, POST: 1440, PUT: 960, DELETE: 400, id: 2 },
		{ route: '/api', GET: 820, POST: 1000, PUT: 640, DELETE: 400, id: 3 },
		{ route: '/Dinosaurs', GET: 820, POST: 560, PUT: 720, DELETE: 400, id: 4 },
		{ route: '/test', GET: 3840, POST: 1920, PUT: 960, DELETE: 400, id: 5 },
		{ route: '/test/api', GET: 1600, POST: 1440, PUT: 960, DELETE: 400, id: 6 },
		{ route: '/api', GET: 820, POST: 1000, PUT: 640, DELETE: 400, id: 7 },
		{ route: '/Dinosaurs', GET: 820, POST: 560, PUT: 720, DELETE: 400, id: 8 }
	];

	export const method = ['GET', 'POST', 'PUT', 'DELETE'];
	export const colors = ['lightgreen', 'yellow', 'orange', 'red'];

	const stacks = Pancake.stacks(totals, method, 'id');
	console.log(stacks[0]);

	const max = stacks.reduce((max, stack) => Math.max(max, ...stack.values.map((v) => v.end)), 0);
</script>

<div class="chart">
	<Pancake.Chart x1={0} x2={max} y1={0.5} y2={totals[totals.length - 1]['id'] + 0.5}>
		<Pancake.Grid horizontal count={totals[totals.length - 1]['id']} let:value let:first>
			<div class="grid-line horizontal"><span>{totals[value - 1]['route']}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical count={5} let:value>
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

<style>
	.chart {
		height: 100%;
		padding: 1em 0em 3em 3em;
		margin: 0 0 36px 0;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: calc(100% + 3em);
		left: -3em;
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
