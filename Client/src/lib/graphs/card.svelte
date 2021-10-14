<script>
	export let cardValue;
	let color;

	if (Object.keys(cardValue)[0] === '200') color = 'lightgreen';
	else if (Number(Object.keys(cardValue)[0]) > 200 && Number(Object.keys(cardValue)[0]) < 400)
		color = 'orange';
	else if (Number(Object.keys(cardValue)[0]) === 500) color = 'orange';
	else if (Number(Object.keys(cardValue)[0]) > 400) color = 'red';
</script>

<div class="card" style="--color:{color}">
	<h1>{Object.keys(cardValue)[0]}</h1>
	{cardValue[Object.keys(cardValue)[0]]}
</div>

<style>
	.card {
		background-color: var(--bs-dark);
		color: var(--color);
		height: 100%;
		font-size: 3em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: 2px 2px 10px black;
	}
</style>
