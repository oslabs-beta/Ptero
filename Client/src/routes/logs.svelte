<script>
	import { Table } from 'sveltestrap';
	import { Logs } from '$lib/store.ts';
</script>

<section>
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
</style>
