<script>
	import { TabContent, TabPane } from 'sveltestrap';
</script>

<section>
	<TabContent vertical pills>
		<TabPane tabId="alpha" tab="Alpha" active>
			<h2>Alpha</h2>
			<img
				alt="Alpha Flight"
				src="https://upload.wikimedia.org/wikipedia/en/4/49/Alpha_Flight_cast_picture_%28John_Byrne_era%29.gif"
			/>
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
	</TabContent>
</section>

<style>
	section {
		height: 100%;
	}
</style>
