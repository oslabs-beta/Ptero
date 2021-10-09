<script lang="ts">
	import { Button, Offcanvas } from 'sveltestrap';
	let open = false;
	const toggle = () => (open = !open);
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
		<div class="graph" />
		<div class="graph" />
		<div class="graph" />
		<div class="graph" />
		<div class="graph" />
		<div class="graph" />
	</div>
</section>

<style>
	h1 {
		color: white;
	}
	section {
		display: flex;
		align-items: stretch;
		justify-content: center;
		flex-grow: 1;
	}
	#graphs {
		padding: 2em;
		gap: 2em;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
	.graph {
		height: 26.5vh;
		width: 47vw;
		background-color: var(--bs-dark);
	}
</style>
