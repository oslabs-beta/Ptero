<script>
	import { page } from '$app/stores';
	import { Button, Offcanvas } from 'sveltestrap';
	let open = false;
</script>

<header>
	<div>
		
		<Button color="light" on:click={() => (open = true)}>Menu</Button>
		<Offcanvas header="Ptero" scroll isOpen={open}>
			<Button color="danger" on:click={() => (open = false)}>Close Menu</Button>
		</Offcanvas>
			<nav>
				<ul>
					<li class:active={$page.path === '/'}>
						<a href="/">Home</a>
					</li>
					<li class:active={$page.path === '/graph1'}>
						<a href="/graph1">Graph 1</a>
					</li>
					<li class:active={$page.path === '/graph2'}>
						<a href="/graph2">Graph 2</a>
					</li>
					<li class:active={$page.path === '/graph3'}>
						<a href="/graph3">Graph 3</a>
					</li>
				</ul>
			</nav>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}
	nav {
		background: var(--bg-color);
		justify-content: flex-end;
	}
	ul {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: var(--base);
	}
	li {
		list-style-type: none;
	}
	a {
		text-shadow: var(--shadow-text);
		color: steelblue;
		margin: 2em;
	}
	a:visited,
	a:hover {
		text-decoration: none;
		font-family: 'Montserrat', sans-serif;
		/* color: inherit; */
	}
	a:focus {
		color: white;
	}
	.active {
		border-bottom: 2px solid var(--accent-color);
		height: 5em;
		justify-content: center;
		background-color: var(--background-color);
		color: white;
		border-radius: 10px 0 0 10px;
	}
</style>
