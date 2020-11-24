<script>
	import Router from 'svelte-spa-router';

	import { Navbar, NotFound } from '@beehive/components';

	import AllBees from './routes/bees/index.svelte';
	import ShowBee from './routes/bees/show.svelte';
	import NewBee from './routes/bees/new.svelte';
	import AllChains from './routes/chains/index.svelte';
	import ShowChain from './routes/chains/show.svelte';
	import AllHives from './routes/hives/index.svelte';
	import ShowHive from './routes/hives/show.svelte';


	const routes = {
		'/': AllBees,

		'/bees':           AllBees,
		'/bees/new/:hive': NewBee,
		'/bees/:bee':      ShowBee,

		'/chains':       AllChains,
		'/chains/:chain': ShowChain,

		'/hives':       AllHives,
		'/hives/:hive': ShowHive,

		'*': NotFound,
	};
</script>

<header>
	<Navbar />
</header>

<div id="content">
	<Router {routes} restoreScrollState />
</div>

<style global>
	@import "./styles/global.css";
</style>