<script>
	import { TabContent, TabPane } from 'sveltestrap';
</script>

<section>
	<div id="settingsWindow">
		<TabContent vertical>
			<TabPane
				tabId="Server"
				tab="Server Settings"
				style="background-color:var(--bs-dark); width:50%; height=100%;"
			>
				<h2>Server</h2>
				<div id="backendAddressDiv">
					<label for="backendAddress">Back-end address:</label>
					<input type="text" id="fname" name="fname" /><br /><br />
				</div>
				<div id="refreshRateDiv">
					<label for="refreshRate">Refresh rate:</label>
					<input type="text" id="refreshRate" name="refreshRate" /><br /><br />
				</div>
				<div id="APIKeyDiv">
					<label for="APIKey">API Key:</label>
					<input type="text" id="APIKey" name="APIKey" /><br /><br />
				</div>
			</TabPane>
			<TabPane
				tabId="Redis"
				tab="Redis Settings"
				style="background-color:var(--bs-dark); width:50%; height=100%;"
			>
				<h2>Caching Time to Leave</h2>
				<div id="RedisTTLDiv">
					<label for="RedisTTL">Time to leave:</label>
					<input type="text" id="fname" name="fname" /> ms<br /><br />
				</div>
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
