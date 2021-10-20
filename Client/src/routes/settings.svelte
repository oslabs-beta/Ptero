<script>
	import { TabContent, TabPane } from 'sveltestrap';
	import { Settings } from '$lib/store.ts';
</script>

<section>
	<div id="settingsWindow">
		<TabContent vertical>
			<TabPane
				tabId="Connection"
				tab="Connection Settings"
				style="background-color:var(--bs-dark); :30em; height=100%; padding: 2em; border-radius:50px"
			>
				<h2>Server</h2>
				<div class="settingsContent">
					<div id="serverAddressDiv">
						<label for="serverAddress">Back-end address:</label>
						<input
							type="text"
							id="serverAddress"
							name="serverAddress"
							bind:value={$Settings.serverAddress}
							placeholder={$Settings.serverAddress}
						/>
						{$Settings.serverAddress}<br /><br />
					</div>
					<div id="APIKeyDiv">
						<label for="APIKey">API Key:</label>
						<input
							type="text"
							id="APIKey"
							name="APIKey"
							bind:value={$Settings.svelteAPIKey}
							placeholder={$Settings.svelteAPIKey}
						/>
						{$Settings.svelteAPIKey}<br /><br />
					</div>
					<div id="refreshRateDiv">
						<label for="refreshRate">Refresh rate (s):</label>
						<input
							type="text"
							id="refreshRate"
							name="refreshRate"
							bind:value={$Settings.refreshRate}
							placeholder={$Settings.refreshRate}
						/>
						{$Settings.refreshRate}<br /><br />
					</div>
				</div>
			</TabPane>
			<TabPane
				tabId="Redis"
				tab="Redis Settings"
				style="background-color:var(--bs-dark); width:30em; height=100%; padding: 2em; border-radius:50px"
			>
				<h2>Caching Time to Leave</h2>
				<div class="settingsContent">
					<div id="RedisTTLDiv">
						<label for="RedisTTL">Time to leave(m):</label>
						<input
							type="text"
							id="redisTTL"
							name="redisTTL"
							bind:value={$Settings.redisTTL}
							placeholder={$Settings.redisTTL}
						/>
						{$Settings.redisTTL}
						<br /><br />
					</div>
				</div>
			</TabPane>
			<TabPane
				tabId="david"
				tab="David"
				style="background-color:var(--bs-dark); width:30em; height=100%; padding: 2em; border-radius:50px"
				active
			>
				<h2>David</h2>
				<div class="settingsContent">
					<img
						alt="David"
						src="https://cdn.discordapp.com/attachments/894324663444979742/895447059736440833/david.PNG"
					/>
				</div>
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
	input {
		border-radius: 5px;
	}
	.settingsContent {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	#APIKey {
		width: 20em;
	}
	#serverAddress {
		width: 15.5em;
	}
	#refreshRate {
		width: 3em;
	}
	#redisTTL {
		width: 3em;
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
