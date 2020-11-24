<script>
	import { Loading } from '@beehive/components';
	import { checkSearch } from '@beehive/helpers';
	import { chains } from '@beehive/stores';
	// noinspection ES6UnusedImports
	import { link } from 'svelte-spa-router';
	// noinspection ES6UnusedImports
	import { fade } from 'svelte/transition';


	let searchValue = '';


	function deleteChain(chain) {
		const confirmed = confirm('Do you really want to delete chain "' + chain.name + '"?');

		if (confirmed) {
			chains.delete(chain.id).catch(() => alert('An error occurred!'));
		}
	}
</script>

<section class="page-header" in:fade>
	<h1 class="page-title">My Chains</h1>
	<div class="page-search">
		<input bind:value={searchValue} type="search" class="page-search-input" placeholder="Filter Chains" />
	</div>
</section>

<section class="page-container">
	<div class="page-container-inner">

		{#if $chains === null}
			<Loading />
		{:else if $chains === false}
			<p class="text-muted">Something went wrong</p>
		{:else}
			<ul class="chains" in:fade>
				{#each $chains as chain (chain.id)}
					{#if checkSearch(searchValue, chain)}
						<li class="chain-item" style="background-color: {chain.eventBee.namespace.logocolor}">
							<a href="/chains/{chain.id}" use:link class="chain-item-body divide-x">
								<img class="chain-item-image" src={chain.eventBee.namespace.image}>

								<div class="chain-item-content">
									<h1 class="chain-item-title">{chain.name}</h1>
									<p class="chain-item-description">{chain.description}</p>
								</div>
							</a>

							<div class="chain-item-side">
								<button class="chain-item-button" on:click={() => deleteChain(chain)}>
									<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
								</button>
							</div>
						</li>
					{/if}
				{:else}
					<p class="text-muted">
						You haven't created any Chains yet.
					</p>
				{/each}

				<li class="chain-item fake-chain-item">
					<a href="/chains/new" use:link class="chain-item-body divide-x">
						<svg class="chain-item-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
						</svg>

						<div class="chain-item-content">
							<h1 class="chain-item-title">Create Chain</h1>
						</div>
					</a>
				</li>
			</ul>
		{/if}

	</div>
</section>

<style>
	.chains {
		@apply flex flex-col justify-center;
	}

	.chain-item {
		@apply my-3 w-full flex rounded-lg text-white shadow-lg;
	}


	.chain-item-body {
		@apply py-3 pl-4 flex flex-grow flex-wrap;
	}

	.chain-item-image {
		@apply h-16 pr-4;
	}

	.chain-item-content {
		@apply pl-4 flex flex-col justify-center;
	}

	.chain-item-title {
		@apply font-bold text-2xl leading-none;
	}

	.chain-item-description {
		@apply mt-2 text-sm font-semibold leading-tight text-opacity-75;
	}


	.chain-item-side {
		@apply py-3 pr-4 flex justify-between items-center;
	}

	.chain-item-button {
		@apply inline-block text-gray-100 text-sm font-bold leading-none align-middle transition-colors duration-100;
	}

	.chain-item-button:hover {
		@apply text-gray-200;
	}

	.chain-item-button:active {
		@apply text-gray-300;
	}

	.chain-item-button:focus {
		@apply outline-none;
	}


	.fake-chain-item {
		@apply mt-10 text-black shadow-none border-2 border-black border-dashed;
	}

	.fake-chain-item .chain-item-body {
		@apply py-2;
	}

	.fake-chain-item .chain-item-title {
		@apply text-3xl;
	}
</style>