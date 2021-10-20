<!-- Refactoring Tracker 
  Console.log
  Bad comments
  Add Good comments
  Rename functions
  Clean layout -->
<script context="module">
	import Card from '$lib/graphs/card.svelte';
	import { Logs, TotalsStatus, ReqPerEndpointAndMethod, DailyData } from '$lib/store';
	import { Table } from 'sveltestrap';
	import StackedBarHorizontal from '$lib/graphs/StackedBarHorizontal.svelte';
	import StackedBarVerticalOriginal from '$lib/graphs/StackedBarVerticalOriginal.svelte';
</script>

<section>
	<div class="overviewWindow">
		<div class="widget">
			<h1>Requests per day over the last month</h1>
			<StackedBarVerticalOriginal data={DailyData} split={['total']} splitColors={['lightgreen']} />
		</div>
		<div class="widgetNumbers">
			{#each $TotalsStatus as status}
				<div class="numbers">
					<Card cardValue={status} />
				</div>
			{/each}
		</div>
		<div class="widget">
			<h1>Requests per endpoint and method</h1>
			{#if $ReqPerEndpointAndMethod}
				<StackedBarHorizontal
					data={ReqPerEndpointAndMethod}
					split={['GET', 'POST', 'PUT', 'DELETE']}
					splitColors={['lightgreen', 'yellow', 'orange', 'red']}
				/>
			{/if}
		</div>
		<div class="widgetLogs">
			<Table dark>
				<thead>
					<tr>
						<th>Method</th>
						<th>Route</th>
						<th>Response Time</th>
						<th>Status</th>
						<th>Cached</th>
					</tr>
				</thead>
				<tbody>
					{#each $Logs as log}
						<tr>
							<th scope="row">{log.method}</th>
							<td style="width:10%">{log.route}</td>
							<td>{log.respTime}</td>
							<td>{log.status}</td>
							<td>{log.cached}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		align-items: stretch;
		justify-content: stretch;
		flex-grow: 1;
		width: 100%;
		height: 95%;
	}

	.overviewWindow {
		flex-grow: 1;
		padding: 2em;
		gap: 2em;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr 3fr;
	}
	.widget {
		padding: 1em;
		background-color: var(--bs-dark);
	}
	.widget h1 {
		text-align: center;
		font-size: 1.5em;
		font-weight: bolder;
		margin-bottom: 0px;
	}
	.widgetNumbers {
		background-color: var(--bs-dark);
		display: flex;
		justify-content: stretch;
		align-content: stretch;
		padding: 1em;
		gap: 1em;
	}
	.widgetLogs {
		padding: 1em;
		background-color: var(--bs-dark);
		overflow-y: scroll;
		scrollbar-color: var(--bs-dark);
		font-size: 0.8em;
	}
	.widgetLogs thead th {
		color: var(--bs-light);
		border-radius: 5px;
		background-color: var(--bs-dark);
	}
	.widgetLogs thead th:hover {
		color: var(--bs-dark);
		border-radius: 5px;
		background-color: var(--bs-light);
	}
	.numbers {
		flex-grow: 1;
		/* background-color: var(--bs-light); */
	}
</style>
