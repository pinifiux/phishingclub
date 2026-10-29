<script>
	import { onMount } from 'svelte';
	import { setPerPagePreference } from '$lib/store/preferences';

	/**
	 * @type {*|null}
	 */
	export let pagination = null;

	let value = pagination?.perPage;

	const setSearch = () => {
		pagination.perPage = value;
		// save to localStorage for persistence across pages
		setPerPagePreference(value);
	};

	onMount(() => {
		pagination.onChange((k, v) => {
			if (k === 'perPage') {
				value = v;
			}
		});
	});
</script>

<div>
	<label for="pet-select" class="text-xs text-content-subtle"
		>Show:</label
	>
	<select
		class="rounded-md border border-hairline bg-surface-inset text-sm text-content outline-none placeholder:text-content-subtle focus:border-brand/60 px-2 py-1 text-xs"
		name="entries"
		id="entries"
		bind:value
		on:change={() => {
			if (pagination && pagination.perPage !== null) {
				setSearch();
			}
		}}
	>
		{#each [10, 25, 50] as option}
			{#if option === value}
				<option value={option} selected>{option}</option>
			{:else}
				<option value={option}>{option}</option>
			{/if}
		{/each}
	</select>
</div>
