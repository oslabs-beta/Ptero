<script>
	import { TabContent, TabPane } from 'sveltestrap';
</script>

<section>
	<div id="settingsWindow">
		<TabContent vertical>
			<TabPane
				style="background-color:var(--bs-dark); flex-grow:1; height=100%;"
				tabId="alpha"
				tab="Alpha"
				active
			>
				<h2>Alpha</h2>
				<div class="settingOption">HELLO</div>
			</TabPane>
			<TabPane tabId="bravo" tab="Bravo">
				<h2>Bravo</h2>
				<img
					alt="Johnny Bravo"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Johnny_Bravo_series_logo.png/320px-Johnny_Bravo_series_logo.png"
				/>
			</TabPane>
			<TabPane tabId="charlie" tab="Charlie">
				<h2>Charlie</h2>
				<img
					alt="Charlie Brown"
					src="https://upload.wikimedia.org/wikipedia/en/2/22/Charlie_Brown.png"
				/>
			</TabPane>
			<TabPane tabId="david" tab="David" active>
				<h2>David</h2>
				<img
					alt="David"
					src="https://cdn.discordapp.com/attachments/894324663444979742/895447059736440833/david.PNG"
				/>
			</TabPane>
			<TabPane tabId="david" tab="David" active>
				<h2>David</h2>
				<img
					alt="David"
					src="https://cdn.discordapp.com/attachments/894324663444979742/895447059736440833/david.PNG"
				/>
			</TabPane>
		</TabContent>
	</div>
</section>

<style>
	section {
		display: flex;
		align-items: stretch;
		justify-content: stretch;
		flex-grow: 1;
		width: 100%;
	}
	#settingsWindow {
		padding: 2em;
		flex-grow: 1;
	}

	.settingOption {
		flex-grow: 1;
		height: 100%;
		background-color: var(--bs-dark);
	}
</style>
