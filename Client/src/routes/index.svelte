<script context="module">
	import { Card } from 'sveltestrap';
	// export const prerender = true;
	import { Button, Offcanvas } from 'sveltestrap';
	let open = false;
</script>

<section>
	<div class="overviewWindow">
		<div class="widget" />
		<div class="widget" />
		<div class="widgetNumbers">
			<div class="numbers" />
			<div class="numbers" />
			<div class="numbers" />
		</div>
		<div class="widget" />
		<div class="widget" />
		<div class="widget" />
	</div>
</section>

<style>
	section {
		display: flex;
		align-items: stretch;
		justify-content: center;
		flex-grow: 1;
	}
	.overviewWindow {
		padding: 2em;
		gap: 2em;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
	.widget {
		height: 26.5vh;
		width: 47vw;
		background-color: var(--bs-dark);
	}
	.widgetNumbers{
		height: 26.5vh;
		width: 47vw;
		background-color: var(--bs-dark);
	}
</style>
