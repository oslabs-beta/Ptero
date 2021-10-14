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

<!-- {#if $IndexBars.length > 1} -->
<div class="chart">
	<Pancake.Chart x1={0} x2={max} y1={0.5} y2={10.5}>
		<Pancake.Grid horizontal count={totals.length} let:value let:first>
			<!-- {#if totals[value - 1]} -->
			<div class="grid-line horizontal"><span>{totals[value - 1]['route']}</span></div>
			<!-- {/if} -->
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
<!-- {/if} -->

<!-- EXEMPLE PROVIDED OBJECT -->

<!-- [
    {
        "route": "/log",
        "GET": 629,
        "POST": 0,
        "PUT": 0,
        "DELETE": 0,
        "id": 1,
        "tot": 629
    },
    {
        "route": "/api/dinosaurs",
        "GET": 107,
        "POST": 0,
        "PUT": 0,
        "DELETE": 0,
        "id": 2,
        "tot": 107
    },
    {
        "route": "/test/characters/",
        "GET": 36,
        "POST": 4,
        "PUT": 1,
        "DELETE": 0,
        "id": 3,
        "tot": 41
    },
    {
        "route": "/api/dinosaurs/1",
        "GET": 25,
        "POST": 0,
        "PUT": 0,
        "DELETE": 0,
        "id": 4,
        "tot": 25
    },
    {
        "route": "/api/dinosaurs/",
        "GET": 22,
        "POST": 0,
        "PUT": 0,
        "DELETE": 0,
        "id": 5,
        "tot": 22
    },
    {
        "route": "/api/dinosaurs/2",
        "GET": 21,
        "POST": 0,
        "PUT": 0,
        "DELETE": 0,
        "id": 6,
        "tot": 21
    },
    {
        "route": "/test/characters/5d964d2a4712b40af6b6b654",
        "GET": 19,
        "POST": 0,
        "PUT": 0,
        "DELETE": 0,
        "id": 7,
        "tot": 19
    },
    {
        "route": "/test/characters",
        "GET": 14,
        "POST": 0,
        "PUT": 0,
        "DELETE": 0,
        "id": 8,
        "tot": 14
    },
    {
        "route": "/test/characters/5d964d2a4712b40af6b6b66e",
        "GET": 2,
        "POST": 0,
        "PUT": 12,
        "DELETE": 0,
        "id": 9,
        "tot": 14
    },
    {
        "route": "/test/character/",
        "GET": 13,
        "POST": 0,
        "PUT": 0,
        "DELETE": 0,
        "id": 10,
        "tot": 13
    }
] -->
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
