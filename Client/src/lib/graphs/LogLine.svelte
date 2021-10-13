<script>
	export let method;
	export let route;
	export let status;
	export let time;
	export let cached;
</script>

<div class="logLine">
	<div class="method">
		{method}
	</div>
	<div class="route">
		{route}
	</div>
	<div class="status">
		{status}
	</div>
	<div class="time">
		{time}
	</div>
	<div class="cached">
		{cached}
	</div>
</div>

<style>
	.logLine {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		gap: 2%;
	}

	.method {
		width: 5%;
	}
	.route {
		width: 30%;
		overflow: hidden;
	}
	.status {
		width: 5%;
	}
	.time {
		width: 10%;
	}
	.cached {
		width: 10%;
	}
</style>
