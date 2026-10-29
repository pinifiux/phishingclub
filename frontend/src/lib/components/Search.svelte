<script>
	import { onMount } from 'svelte';

	/** @type {*|null} */
	export let pagination = null;
	let value = pagination?.search;
	let searchTimeoutID = null;

	const setSearch = () => {
		clearTimeout(searchTimeoutID);
		searchTimeoutID = setTimeout(() => {
			pagination.search = value;
		}, 400);
	};

	onMount(() => {
		// listen for browser back/forward navigation
		//window.addEventListener('popstate', popStateHandler);
		// cleanup on component unmount
		pagination.onChange((k, v) => {
			if (k === 'search') {
				value = v;
			}
		});

		return () => {
			//window.removeEventListener('popstate', popStateHandler);
		};
	});
</script>

<div class="relative flex items-center">
	<img class="ml-2.5 w-3.5 h-3.5 absolute z-10 opacity-60 dark:invert" src="/search-icon.svg" alt="search icon" />
	<input
		type="text"
		bind:value
		on:keyup={() => {
			if (pagination && pagination.search !== null) {
				setSearch();
			}
		}}
		class="relative w-56 rounded-md border border-hairline bg-surface-inset text-sm text-content outline-none placeholder:text-content-subtle focus:border-brand/60 py-1.5 pl-8 pr-3"
		placeholder="Search"
	/>
</div>
