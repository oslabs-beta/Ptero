<!-- Refactoring Tracker 
  Console.log - OK
  Bad comments - OK
  Add Good comments
  Rename functions - OK
  Clean layout - OK -->
<script lang="ts">
	import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'sveltestrap';

	let isOpen = false;

	function handleUpdate(event: any) {
		isOpen = event.detail.isOpen;
	}
</script>

<Navbar style="align-self:stretch" color="dark" dark expand="md">
	<NavbarBrand href="/">Ptero</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav class="ms-auto" navbar>
			<NavItem>
				<NavLink href="/graphs">Graphs</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="/logs">Logs</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="/settings">Settings</NavLink>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>
