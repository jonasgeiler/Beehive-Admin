<script>
	import { BeeSwitch, Loading } from '@beehive/components';
	import { checkSearch } from '@beehive/helpers';
	import { bees } from '@beehive/stores';
	import formatDistanceToNow from 'date-fns/formatDistanceToNow';
	// noinspection ES6UnusedImports
	import { link } from 'svelte-spa-router';
	// noinspection ES6UnusedImports
	import { fade } from 'svelte/transition';


	let searchValue = '';

	function formatDate(dateStr) {
		if (dateStr === '0001-01-01T00:00:00Z') return 'never';

		return formatDistanceToNow(new Date(dateStr));
	}

	function deleteBee(bee) {
		const confirmed = confirm('Do you really want to delete "' + bee.name + '"?');

		if (confirmed) {
			bees.delete(bee.id).catch(() => alert('An error occurred!'));
		}
	}
</script>

<section class="page-header" in:fade>
	<h1 class="page-title">My Bees</h1>
	<div class="page-search">
		<input bind:value={searchValue} type="search" class="page-search-input" placeholder="Filter Bees" />
	</div>
</section>

<section class="page-container">
	{#if $bees === null}
		<Loading />
	{:else if $bees === false}
		<p class="text-muted">Something went wrong</p>
	{:else}
		<ul class="bees" in:fade>
			{#each $bees as bee (bee.id)}
				{#if checkSearch(searchValue, bee)}
					<li class="bee">
						<div class="bee-card" style="background-color: {bee.active ? bee.namespace.logocolor : '#9ca3af'};">

							<a href="/bees/{bee.id}" use:link class="bee-card-body">
								<img class="bee-card-image" src={bee.namespace.image} alt="Logo" />

								<h1 class="bee-card-title">
									{bee.name}
								</h1>

								<h2 class="bee-card-description">
									{bee.description}
								</h2>

								<ul class="bee-card-info">
									<li class="bee-card-info-item">
										<svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
										</svg>
										<span class="item-data">{formatDate(bee.lastaction)}</span>
									</li>

									<li class="bee-card-info-item">
										<svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
										<span class="item-data">{formatDate(bee.lastevent)}</span>
									</li>
								</ul>
							</a>

							<div class="bee-card-footer">
								<BeeSwitch {bee} ballColor={bee.active ? bee.namespace.logocolor : '#9ca3af'} />

								<button class="bee-card-button" on:click={() => deleteBee(bee)}>
									<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
								</button>
							</div>

						</div>
					</li>
				{/if}
			{:else}
				<p class="text-muted">
					You haven't created any Bees yet.<br>
					Check out the <a class="link" href="/hives" use:link>available Hives</a> and create your first one!
				</p>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.bees {
		@apply flex flex-wrap justify-center;
	}

	.bee {
		@apply m-2 w-full;
	}

	@screen xs {
		.bee {
			@apply w-96;
		}
	}

	@screen sm {
		.bee {
			@apply w-72;
		}
	}

	.bee-card {
		@apply flex flex-col rounded-lg text-white shadow-lg overflow-hidden transition-colors duration-300;
	}

	.bee-card-body {
		@apply px-5 pt-6 min-h-40 flex flex-col;
	}


	.bee-card-image {
		@apply h-12 w-12 mb-3;
	}

	.bee-card-title {
		@apply font-bold text-2xl leading-none;
	}

	.bee-card-description {
		@apply mt-2 text-sm font-semibold leading-tight text-opacity-75;
	}


	.bee-card-info {
		@apply flex flex-col my-6;
	}

	.bee-card-info-item {
		@apply inline-flex items-center;
	}

	.bee-card-info-item > .item-data {
		@apply ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap;
	}


	.bee-card-footer {
		@apply p-4 pt-1 flex flex-wrap justify-between items-center;
	}

	.bee-card-button {
		@apply inline-block text-gray-100 text-sm font-bold leading-none align-middle transition-colors duration-100;
	}

	.bee-card-button:hover {
		@apply text-gray-200;
	}

	.bee-card-button:active {
		@apply text-gray-300;
	}

	.bee-card-button:focus {
		@apply outline-none;
	}
</style>