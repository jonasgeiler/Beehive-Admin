<script>
	import { fade } from 'svelte/transition';
	import { link } from 'svelte-spa-router';

	import { hives } from '@beehive/stores';
	import { Loading, NotFound } from '@beehive/components';


	let searchValue = '';
</script>

<section class="section-container" in:fade>
	<h1 class="section-title">Available Hives</h1>
	<div class="section-search">
		<input bind:value={searchValue} type="search" class="section-search-input" placeholder="Filter Hives" />
	</div>

	{#if $hives === null}
		<Loading />
	{:else if $hives === false}
		<p class="text-muted">Something went wrong</p>
	{:else}
		<ul class="hives" in:fade>
			{#each $hives as hive (hive.id)}
				{#if !searchValue || hive.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1}
					<li class="hive">
						<a href="/hives/{hive.id}" use:link class="hive-card" style="background-color: {hive.logocolor}">
							<img class="hive-card-image" src={hive.image} alt="{hive.name} Logo" />
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

	@screen md {
		.hive {
			@apply w-80;
		}
	}

	@screen lg {
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