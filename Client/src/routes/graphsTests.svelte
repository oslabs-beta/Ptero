<script>
	import { TabContent, TabPane } from 'sveltestrap';
  import Graph1 from '$lib/graphs/graph1.svelte';
  import Graph2 from '$lib/graphs/graph2.svelte';
  import { page } from '$app/stores';
</script>

<section>
	<TabContent vertical>
		<TabPane tabId="graph1" tab="Graph 1" active>
      <section2>
      <h1>TYESTESKLTJESLKJTRFKLJ</h1>
			<Graph1/>
      </section2>
		</TabPane>
		<TabPane tabId="graph2" tab="Graph 2">
			<Graph2/>
		</TabPane>
		<TabPane tabId="charlie" tab="Charlie">
			<h2>Charlie</h2>
			<img
				alt="Charlie Brown"
				src="https://upload.wikimedia.org/wikipedia/en/2/22/Charlie_Brown.png"
			/>
		</TabPane>
		<TabPane tabId="david" tab="David">
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
    background-color: plum;
	}
  section2 {
    background-color: red;
  }
  .active {
    background-color: pink;
  }

</style>
