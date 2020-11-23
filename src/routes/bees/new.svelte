<script>
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	import { headerBackground } from '@beehive/stores';
	import getHive from '@beehive/stores/derived/hive';
	import { Header, Loading, NotFound } from '@beehive/components';


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

	<section class="section-container max-w-2xl" in:fade>
		<h1 class="section-title">New Bee</h1>

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
					<label class="field-label">{option.Description}</label>
					<input class="field-input" type="text" value={option.Value || ''} placeholder={option.Default} />
				</li>
			{:else}
				<li class="field text-muted">No configuration needed.</li>
			{/each}

			<!-- TODO: OAuth2 -->
		</ul>

		<div class="flex justify-end mt-6">
			<button class="btn btn-black">Create</button>
		</div>
	</section>
{/if}