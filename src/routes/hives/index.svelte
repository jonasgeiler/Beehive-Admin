<script>
	import { Loading } from '@beehive/components';
	import { checkSearch } from '@beehive/helpers';

	import { hives } from '@beehive/stores';
	// noinspection ES6UnusedImports
	import { link } from 'svelte-spa-router';
	// noinspection ES6UnusedImports
	import { fade } from 'svelte/transition';


	let searchValue = '';
</script>

<section class="page-header" in:fade>
	<h1 class="page-title">Available Hives</h1>
	<div class="page-search">
		<input bind:value={searchValue} type="search" class="page-search-input" placeholder="Filter Hives" />
	</div>
</section>

<section class="page-container">
	{#if $hives === null}
		<Loading />
	{:else if $hives === false}
		<p class="text-muted">Something went wrong</p>
	{:else}
		<ul class="hives" in:fade>
			{#each $hives as hive (hive.id)}
				{#if checkSearch(searchValue, hive)}
					<li class="hive">
						<a href="/hives/{hive.id}" use:link class="hive-card" style="background-color: {hive.logocolor}">
							<img class="hive-card-image" src={hive.image} alt="Logo" />
							<span class="hive-card-title">{hive.name}</span>
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</section>

<style>
	.hives {
		@apply flex flex-wrap justify-center;
	}

	.hive {
		@apply m-2 w-full;
	}

	@screen xs {
		.hive {
			@apply w-96;
		}
	}

	.hive-card {
		@apply p-6 h-52 flex flex-col items-center rounded-lg justify-around text-white shadow-lg;
	}

	.hive-card-image {
		@apply h-24;
	}

	.hive-card-title {
		@apply w-full text-center font-bold text-3xl overflow-hidden overflow-ellipsis whitespace-nowrap;
	}
</style>