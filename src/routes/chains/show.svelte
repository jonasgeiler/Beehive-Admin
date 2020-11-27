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

	<section class="page-container pt-16" in:fade>
		<div class="page-container-inner">

			<h1 class="page-title">Flow</h1>

			<div class="flow">
				<div class="flow-group">
					<a href="/bees/{$chain.eventBee.id}" use:link class="flow-item flow-bee divide-x" style="background-color: {$chain.eventBee.namespace.logocolor}">
						<img class="flow-bee-image" src={$chain.eventBee.namespace.image}>

						<div class="flow-bee-content">
							<h1 class="flow-bee-title">{$chain.eventBee.name}</h1>
							<p class="flow-bee-event">{$chain.event.Name}</p>
						</div>
					</a>
				</div>

				<svg class="flow-separator" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 100" stroke="currentColor">
					<line stroke-linecap="round" stroke-width="4" stroke-dasharray="2px 20px" x1="5" x2="5" y1="0" y2="100" />
				</svg>

				<ul class="flow-group space-y-4">
					{#if $chain.filters && $chain.filters.length > 0}
						{#each $chain.filters as filter}
							<li class="flow-item flow-filter divide-x">
								<h1 class="flow-filter-value">{filter}</h1>
							</li>
						{/each}
					{:else}
						<li class="flow-item fake-flow-item">
							<h1 class="fake-flow-title">No Filters</h1>
						</li>
					{/if}
				</ul>

				<svg class="flow-separator" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 100" stroke="currentColor">
					<line stroke-linecap="round" stroke-width="4" stroke-dasharray="2px 20px" x1="5" x2="5" y1="0" y2="100" />
				</svg>

				<div class="flow-group">
					{#each $chain.actions as action}
						<a href="/bees/{action.bee.id}" use:link class="flow-item flow-bee divide-x" style="background-color: {action.bee.namespace?.logocolor}">
							<img class="flow-bee-image" src={action.bee.namespace?.image}>

							<div class="flow-bee-content">
								<h1 class="flow-bee-title">{action.bee.name}</h1>
								<p class="flow-bee-event">{action.name}</p>
							</div>
						</a>
					{/each}
				</div>
			</div>

		</div>
	</section>
{/if}

<style>
	.flow-item {
		@apply w-full py-3 pl-4 flex flex-wrap rounded-lg text-white shadow-lg;
	}


	.flow-bee-image {
		@apply h-16 pr-4;
	}

	.flow-bee-content {
		@apply pl-4 flex flex-col justify-center;
	}

	.flow-bee-title {
		@apply font-bold text-2xl overflow-hidden overflow-ellipsis whitespace-nowrap;
	}

	.flow-bee-event {
		@apply mt-1 font-mono text-base text-opacity-75 overflow-hidden overflow-ellipsis whitespace-nowrap;
	}


	.flow-filter {
		@apply py-4 bg-gray-200 text-black flex items-center justify-center;
	}

	.flow-filter-value {
		@apply font-mono text-2xl overflow-hidden overflow-ellipsis whitespace-nowrap;
	}


	.flow-separator {
		@apply mx-auto text-gray-700;
		height:    5rem;
		animation: animate_separator 5s linear both infinite;
	}

	@keyframes animate_separator {
		from {
			stroke-dashoffset: 0;
		}
		to {
			stroke-dashoffset: -5rem;
		}
	}


	.fake-flow-item {
		@apply flex justify-center items-center text-black shadow-none border-2 border-black border-dashed;
	}

	.fake-flow-title {
		@apply text-xl font-semibold;
	}
</style>