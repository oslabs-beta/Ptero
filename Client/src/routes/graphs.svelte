<script lang="ts">
	import { Button, Offcanvas } from 'sveltestrap';
	import StackedBarHorizontal from '$lib/graphs/StackedBarHorizontal.svelte';
	import StackedBarVerticalOriginal from '$lib/graphs/StackedBarVerticalOriginal.svelte';
	import { ReqPerEndpointAndMethod, DailyData, DayRouteTotal } from '$lib/store';

	let open = false;
	const toggle = () => (open = !open);

	let histogramRoutes = [];

	// RouteHistory.suscribe((data) => {
	// 	data.forEach(el => {

	// 	});
	// };
</script>

<section>
	<Offcanvas style="background-color:var(--bs-dark)" scroll isOpen={open} {toggle}>
		<h1 slot="header">
			<i>Hello <b>World!</b></i>
		</h1>
	</Offcanvas>
	<Button style="align-self:center; position:absolute; left: 0px" color="danger" on:click={toggle}
		>O</Button
	>
	<div id="graphs">
		<div class="graph">
			<h1>Requests per endpoint and method</h1>
			{#if $ReqPerEndpointAndMethod}
				<StackedBarHorizontal
					data={ReqPerEndpointAndMethod}
					split={['GET', 'POST', 'PUT', 'DELETE']}
					splitColors={['lightgreen', 'yellow', 'orange', 'red']}
				/>
			{/if}
		</div>
		<div class="graph">
			<h1>Requests per endpoint and method</h1>
			<!-- {#if $RouteHistory} -->
			<!-- <Histogram route={$RouteHistory} /> -->
			<!-- {/if} -->
		</div>
		<div class="graph">
			<h1>Requests per endpoint and method</h1>
			<!-- {#if $dayRouteTotal}
				<StackedBarVertical data={$dayRouteTotal} />
			{/if} -->
		</div>
		<div class="graph">
			<h1>Requests per day over the last month</h1>
			<StackedBarVerticalOriginal data={DailyData} split={['total']} splitColors={['lightgreen']} />
		</div>
		<div class="graph">
			<h1>Requests per endpoint and method</h1>
			{#if $ReqPerEndpointAndMethod}
				<StackedBarHorizontal
					data={ReqPerEndpointAndMethod}
					split={['GET', 'POST', 'PUT', 'DELETE']}
					splitColors={['lightgreen', 'yellow', 'orange', 'red']}
				/>
			{/if}
		</div>
		<div class="graph" />
	</div>
</section>

<style>
	h1 {
		color: white;
		font-size: 1.5em;
		text-align: center;
		margin-bottom: 0px;
	}
	section {
		display: flex;
		align-items: stretch;
		justify-content: stretch;
		flex-grow: 1;
		width: 100%;
	}
	#graphs {
		flex-grow: 1;
		padding: 2em;
		gap: 2em;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr 1fr 1fr;
		grid-auto-columns: max-content;
	}
	.graph {
		background-color: var(--bs-dark);
		padding: 1em;
	}
</style>
