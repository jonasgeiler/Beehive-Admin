<script>
	import { Header, Loading, NotFound, Switch } from '@beehive/components';
	import { bees, headerBackground } from '@beehive/stores';
	import getBee from '@beehive/stores/derived/bee';
	import { onDestroy } from 'svelte';
	// noinspection ES6UnusedImports
	import { link, push } from 'svelte-spa-router';
	import { get } from 'svelte/store';
	// noinspection ES6UnusedImports
	import { fade } from 'svelte/transition';


	export let params = {};

	const bee = getBee(params.bee);

	$: $bee && headerBackground.setColor($bee.active ? $bee.namespace.logocolor : '#9ca3af');
	onDestroy(headerBackground.reset);


	function toggleBeeActive(setState, setText) {
		const _bee = get(bee);
		const newActive = !_bee.active;

		setText(newActive ? 'Starting...' : 'Stopping...');

		bees.setActive(_bee, newActive)
		    .then(() => setState(newActive))
		    .catch(() => setText('Error!'));
	}

	function deleteBee() {
		const _bee = get(bee);
		const confirmed = confirm('Do you really want to delete "' + _bee.name + '"?');

		if (confirmed) {
			bees.delete(_bee.id).then(() => {
				push('/bees');
			}).catch(() => alert('An error occurred!'));
		}
	}
</script>

{#if $bee === null}
	<Loading />
{:else if $bee === false}
	<NotFound />
{:else}
	<Header backgroundColor={$bee.active ? $bee.namespace.logocolor : '#9ca3af'}
	        backLink="/bees"
	        logo={$bee.namespace.image}
	        title={$bee.name}
	        description={$bee.description}>

		<a slot="top" href="/hives/{$bee.namespace.id}" use:link class="btn btn-outlined btn-outlined-inverted">
			<span class="pl-1">{$bee.namespace.name}</span>
		</a>

		<div slot="content">
			<Switch toggleState={toggleBeeActive}
			        initialState={$bee.active}
			        ballColor={$bee.active ? $bee.namespace.logocolor : '#9ca3af'}
			        onText="Running" offText="Stopped" big />
		</div>

	</Header>

	<section class="page-container pt-16" in:fade>
		<div class="page-container-inner">
			<ul class="fields">
				<li class="field field-divider">
					<label class="field-label">Description</label>
					<textarea class="field-input" placeholder="Please enter a description">{$bee.description}</textarea>
				</li>

				{#each $bee.options as option}
					<li class="field">
						<label class="field-label">{option.Name}</label>
						<input class="field-input" type="text" value={option.Value} placeholder={option.Value} />
					</li>
				{:else}
					<li class="field text-muted">No Options...</li>
				{/each}
			</ul>

			<div class="flex justify-between mt-9">
				<button class="btn btn-danger" on:click={deleteBee}>Delete</button>
				<button class="btn btn-black">Save</button>
			</div>
		</div>
	</section>
{/if}