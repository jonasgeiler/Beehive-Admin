<script>
	import { Header, Loading, NotFound } from '@beehive/components';
	import { headerBackground } from '@beehive/stores';
	import getChain from '@beehive/stores/derived/chain';
	import { onDestroy } from 'svelte';
	// noinspection ES6UnusedImports
	import { link } from 'svelte-spa-router';
	// noinspection ES6UnusedImports
	import { fade } from 'svelte/transition';


	export let params = {};

	const chain = getChain(params.chain);

	$: $chain && headerBackground.setColor($chain.eventBee.namespace.logocolor);
	onDestroy(headerBackground.reset);
</script>

{#if $chain === null}
	<Loading />
{:else if $chain === false}
	<NotFound />
{:else}
	<Header backgroundColor={$chain.eventBee.namespace.logocolor}
	        backLink="/hives"
	        logo={$chain.eventBee.namespace.image}
	        title={$chain.name}
	        description={$chain.description} />
{/if}