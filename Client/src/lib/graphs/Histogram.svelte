<script>
	import * as Pancake from '@sveltejs/pancake';

	export let route;

	let x1 = +Infinity;
	let x2 = -Infinity;
	let y1 = +Infinity;
	let y2 = -Infinity;

	route.forEach((path) => {
		path.data.forEach((d) => {
			if (d.x < x1) x1 = d.x;
			if (d.x > x2) x2 = d.x;
			if (d.y < y1) y1 = d.y;
			if (d.y > y2) y2 = d.y;
		});
	});

	let closest;

	let points = route.reduce((points, path) => {
		return points.concat(
			path.data.map((d) => ({
				x: d.x,
				y: d.y,
				path
			}))
		);
	}, []);
</script>

<div class="chart">
	<Pancake.Chart {x1} {x2} {y1} {y2}>
		<Pancake.Grid horizontal count={6} let:value>
			<div class="grid-line horizontal"><span>{value}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical count={15} let:value>
			<span class="x-label">{value}</span>
		</Pancake.Grid>

		<Pancake.Svg>
			{#each route as country}
				<Pancake.SvgLine data={country.data} let:d>
					<path class="data" {d} />
				</Pancake.SvgLine>
			{/each}

			{#if closest}
				<Pancake.SvgLine data={closest.country.data} let:d>
					<path class="highlight" {d} />
				</Pancake.SvgLine>
			{/if}
		</Pancake.Svg>

		{#if closest}
			<Pancake.Point x={closest.x} y={closest.y}>
				<span class="annotation-point" />
				<div
					class="annotation"
					style="transform: translate(-{100 * ((closest.x - x1) / (x2 - x1))}%,0)"
				>
					<strong>{closest.country.name}</strong>
					<span>{closest.x}: {closest.y} day</span>
				</div>
			</Pancake.Point>
		{/if}
		<Pancake.Quadtree data={points} bind:closest />
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 80%;
		padding: 0em 0em 0em 2em;
	}

	.grid-line {
		position: relative;
		display: block;
	}
	.grid-line.horizontal {
		width: calc(100% + 2em);
		left: -2em;
		border-bottom: 1px dashed #ccc;
	}
	.grid-line span {
		position: absolute;
		left: 0;
		bottom: 2px;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
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
	path.data {
		stroke: var(--bs-light);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 1px;
		fill: none;
	}
	.highlight {
		stroke: var(--bs-green);
		fill: none;
		stroke-width: 3;
	}
	.annotation {
		position: absolute;
		white-space: nowrap;
		bottom: 1em;
		line-height: 1.2;
		background-color: var(--bs-dark);
		padding: 0.2em 0.4em;
		border-radius: 2px;
	}
	.annotation-point {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: var(--bs-green);
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
	.annotation strong {
		display: block;
		font-size: 20px;
	}
	.annotation span {
		display: block;
		font-size: 14px;
	}
</style>
