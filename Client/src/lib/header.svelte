<script>
	import { page } from '$app/stores';
	//import { MDBBtn } from 'mdbsvelte';
</script>

<header>
	<nav>
		<ul>
			<li class:active={$page.path === '/'}>
				<a href="/">Home</a>
			</li>
			<li class:active={$page.path === '/graphs'}>
				<a href="/graphs">Graphs</a>
			</li>
			<li class:active={$page.path === '/graphsTests'}>
				<a href="/graphsTests">Graphs Test</a>
			</li>
			<li class:active={$page.path === '/settings'}>
				<a href="/settings">Settings</a>
			</li>
		</ul>
	</nav>
</header>

<style>
</style>
