<script>
	import { Header, Loading, NotFound } from '@beehive/components';
	import { headerBackground } from '@beehive/stores';
	import getHive from '@beehive/stores/derived/hive';
	import { onDestroy } from 'svelte';
	// noinspection ES6UnusedImports
	import { link } from 'svelte-spa-router';
	// noinspection ES6UnusedImports
	import { fade } from 'svelte/transition';


	export let params = {};

	const hive = getHive(params.hive);

	$: $hive && headerBackground.setColor($hive.logocolor);
	onDestroy(headerBackground.reset);
</script>

{#if $hive === null}
	<Loading />
{:else if $hive === false}
	<NotFound />
{:else}
	<Header backgroundColor={$hive.logocolor}
	        backLink="/hives"
	        logo={$hive.image}
	        title={$hive.name}
	        description={$hive.description}>

		<a slot="content" href="/bees/new/{$hive.id}" use:link class="hive-header-button btn btn-transparent">
			New Bee
		</a>

	</Header>

	<div class="hive-info-section space-y-10">
		{#if $hive.options && $hive.options.length > 0}
			<section class="option-section">
				<h1 class="page-title">Configuration Options</h1>

				<ul class="options divide-y">
					{#each $hive.options as option}
						<li class="option">
							<div class="flex flex-col ">
								<h1>
									<span class="option-title">{option.Name}</span>
									{#if option.Mandatory}<span class="option-required">*</span>{/if}
									<span class="option-label">{option.Type}</span>
								</h1>

								<p class="option-description">{option.Description}</p>
							</div>

							<div>
								<span class="option-default">{option.Default || 'empty'}</span>
							</div>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if $hive.events && $hive.events.length > 0}
			<section class="event-section">
				<h1 class="page-title">Provided Events</h1>

				<ul class="events">
					{#each $hive.events as event}
						<li class="event" style="background-color: {$hive.logocolor};">
							<h1 class="event-title">{event.Description}</h1>
							<p class="event-description">{event.Name}</p>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if $hive.actions && $hive.actions.length > 0}
			<section class="action-section">
				<h1 class="page-title">Provided Actions</h1>

				<ul class="actions">
					{#each $hive.actions as action}
						<li class="action" style="background-color: {$hive.logocolor};">
							<h1 class="action-title">{action.Description}</h1>
							<p class="action-description">{action.Name}</p>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>
{/if}

<style>
	.hive-header-button {
		@apply my-0 mx-auto text-xl shadow-md;
	}

	.hive-info-section {
		@apply px-10 py-16;
	}


	.option-section {
		@apply flex flex-col items-center mx-auto max-w-3xl;
	}

	.options {
		@apply w-full max-w-3xl px-6 bg-gray-100 rounded-lg;
	}

	.option {
		@apply py-4 flex justify-between items-center;
	}

	.option-title {
		@apply font-bold text-xl leading-tight;
	}

	.option-required {
		@apply font-bold text-2xl text-red-400;
	}

	.option-label {
		@apply ml-3 text-sm py-1 px-3 bg-gray-200 rounded-full;
	}

	.option-description {
		@apply mt-1 text-gray-800;
	}

	.option-default {
		@apply py-2 px-4 bg-gray-600 text-white font-mono rounded-lg;
	}


	.event-section, .action-section {
		@apply max-w-4xl mx-auto;
	}

	.events, .actions {
		@apply flex flex-wrap justify-center;
	}

	.event, .action {
		@apply m-2 p-6 w-full flex flex-col rounded-lg shadow-lg text-white cursor-pointer;
	}

	@screen sm {
		.event, .action {
			@apply w-60 min-h-56;
		}
	}

	.event-title, .action-title {
		@apply font-bold text-2xl leading-tight;
	}

	.event-description, .action-description {
		@apply mt-4 font-mono leading-6 text-opacity-75 overflow-hidden overflow-ellipsis whitespace-nowrap;
	}
</style>