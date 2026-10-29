<script>
	import { onMount } from 'svelte';

	export let paginator;

	let currentPage = paginator.currentPage;
	let urlWithoutParams = window.location.href.split('?')[0];

	export let hasNextPage = true;

	const nextPage = async () => {
		currentPage = paginator.next();
	};

	const previousPage = async () => {
		currentPage = paginator.previous();
	};

	const popStateHandler = () => {
		// only handle popstate if the url matches the current page
		// this is to avoid handling popstate events from other pages
		// upon a browser back/forward navigation as popstate event happens
		// before the component is unmounted
		if (window.location.href.split('?')[0] !== urlWithoutParams) {
			return;
		}
		currentPage = paginator.currentPage;
	};

	onMount(() => {
		// listen for browser back/forward navigation
		window.addEventListener('popstate', popStateHandler);
		// cleanup on component unmount
		paginator.onChange((key, value) => {
			if (key === 'page') {
				currentPage = value;
			}
		});

		return () => {
			window.removeEventListener('popstate', popStateHandler);
		};
	});
</script>

<div class="mt-3 mb-6 flex items-center gap-1 border-t border-hairline pt-2.5 text-xs text-content-subtle">
	<button
		class="grid h-7 w-7 place-items-center rounded border border-hairline text-content-muted hover:bg-surface-overlay disabled:opacity-40 transition-colors"
		disabled={currentPage === 1}
		class:opacity-50={currentPage === 1}
		on:click|preventDefault={previousPage}>&lt;&lt;</button
	>
	<div
		class="px-1.5 tabular-nums text-content-muted"
	>
		{currentPage}
	</div>
	<button
		disabled={!hasNextPage}
		class:opacity-50={!hasNextPage}
		class="grid h-7 w-7 place-items-center rounded border border-hairline text-content-muted hover:bg-surface-overlay disabled:opacity-40 transition-colors"
		on:click|preventDefault={nextPage}>&gt;&gt;</button
	>
</div>
