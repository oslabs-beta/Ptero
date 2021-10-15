<script>
	import { Table } from 'sveltestrap';
	import { Logs } from '$lib/store.ts';
import LogLine from '$lib/graphs/LogLine.svelte';
	
</script>

<section>
	<Table dark>
		<thead>
			<tr>
				<th>Status</th>
				<th>Method</th>
				<th>Route</th>
				<th>Response Time</th>
				<th>API Key</th>
				<th>Cached</th>
			</tr>
		</thead>
		<tbody>
			{#each $Logs as log}
				<tr>
					<div class="bullet">
						{#if log.status >= 400 && log.status < 500}
							<td class="status" style="background-color:firebrick; width:10%">{log.status}</td>
						{:else if log.status >= 500}
							<td class="status" style="background-color:GoldenRod; width:10%">{log.status}</td>
						{:else}
							<td class="status" style="background-color:DarkGreen; width:10%">{log.status}</td>
						{/if}
					</div>
						{#if log.method === 'GET'}
							<th scope="row" class="method" style="color:SteelBlue">{log.method}</th>
						{:else if log.method === 'PUT' || log.method === 'POST'}
							<th scope="row" class="method" style="color:Plum">{log.method}</th>
						{:else}
							<th scope="row" class="method" style="color:tomato">{log.method}</th>
						{/if}
					
					<!-- <th scope="row">{log.method}</th> -->
					<td style>{log.route}</td>
					<td>{log.respTime}</td>
					<td>{log.key}</td>
					<td>{log.cached}</td>
					
				</tr>
			{/each}
		</tbody>
	</Table>
</section>

<style>
	section {
		display: flex;
		align-items: stretch;
		justify-content: stretch;
		flex-grow: 1;
		width: 100%;
		height: 95%;
		padding: 2em;
	}
	.bullet {
		background-color: var(--bs-dark);
	}

	.status {
		width: 3em;
		text-align: center;
		/* height: 100px; */
		/* border: 10px solid black; */
		border-radius: 0.5em;
		/* margin: 50px; */
	}

</style>
