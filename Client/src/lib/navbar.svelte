<script lang="ts">
	import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem
	} from 'sveltestrap';

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
			<NavItem />
			<NavItem>
				<NavLink href="/settings">Settings</NavLink>
			</NavItem>
			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>Options</DropdownToggle>
				<DropdownMenu end>
					<DropdownItem>Option 1</DropdownItem>
					<DropdownItem>Option 2</DropdownItem>
					<DropdownItem divider />
					<DropdownItem>Reset</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</Nav>
	</Collapse>
</Navbar>
