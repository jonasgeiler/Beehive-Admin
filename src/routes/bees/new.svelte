<script>
	import { Header, Loading, NotFound } from '@beehive/components';
	import { headerBackground } from '@beehive/stores';
	import getHive from '@beehive/stores/derived/hive';
	import { onDestroy } from 'svelte';
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
	        backLink="/hives/{$hive.id}" />

	<section class="page-header" in:fade>
		<h1 class="page-title">My Bees</h1>
		<h3 class="page-subtitle">{$hive.name}</h3>
	</section>

	<section class="page-container" in:fade>
		<div class="page-container-inner">

			<ul class="fields">
				<li class="field">
					<label class="field-label">Name</label>
					<input class="field-input" type="text" placeholder="Please enter a name" />
				</li>

				<li class="field field-divider">
					<label class="field-label">Description</label>
					<textarea class="field-input" placeholder="Please enter a description"></textarea>
				</li>

				{#each $hive.options as option}
					<li class="field">
						<label class="field-label">{option.Name}</label>
						<input class="field-input" type="text" value={option.Value || ''} placeholder={option.Default} />
						<p class="field-description">{option.Description}</p>
					</li>
				{:else}
					<li class="field text-muted">No configuration needed.</li>
				{/each}

				<!-- TODO: OAuth2 -->
			</ul>

			<div class="flex justify-end mt-6">
				<button class="btn btn-black">Create</button>
			</div>

		</div>
	</section>
{/if}