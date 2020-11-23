<script>
	import Router from 'svelte-spa-router';

	import { Navbar, NotFound } from '@beehive/components';

	import AllHives from './routes/hives/index.svelte';
	import ShowHive from './routes/hives/show.svelte';
	import AllBees from './routes/bees/index.svelte';
	import ShowBee from './routes/bees/show.svelte';
	import NewBee from './routes/bees/new.svelte';


	const routes = {
		'/': AllBees,

		'/hives':       AllHives,
		'/hives/:hive': ShowHive,

		'/bees':           AllBees,
		'/bees/new/:hive': NewBee,
		'/bees/:bee':      ShowBee,

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