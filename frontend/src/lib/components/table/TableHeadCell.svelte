<script>
	import { onMount } from 'svelte';
	import GhostText from '../GhostText.svelte';

	export let column;
	/** @type {*|null} */
	export let pagination = null;
	export let alignText = 'left';
	export let sortable = false;
	export let size = '';
	// last tells if it the last field column before the actions column
	export let last = false;
	export let isGhost = false;
	export let title = '';

	let sortBy = pagination?.sortBy;
	let sortOrder = pagination?.sortOrder;
	const setSortAndSortBy = () => {
		if (!sortable || !pagination) {
			return;
		}
		pagination.sort(column.toLowerCase(), sortOrder.toLowerCase());
	};

	onMount(() => {
		if (pagination) {
			pagination.onChange(() => {
				sortBy = pagination.sortBy;
				sortOrder = pagination.sortOrder;
			});
		}
	});
</script>

<th
	class="pl-4 py-2 pr-3 font-medium min-w-48"
	class:rounded-br-lg={last}
	class:rounded-tr-lg={last}
	class:w-48={size === 'small'}
	class:w-56={size === 'medium'}
	class:w-80={size === 'large'}
>
	<button
		class="flex group cursor-pointer hover:bg-surface-overlay rounded-md p-1 transition-colors duration-200"
		class:pointer-events-none={!sortable}
		class:table-cell={alignText === 'center'}
		class:hover:bg-transparent={!sortable}
		class:dark:hover:bg-transparent={!sortable}
		on:click|preventDefault={setSortAndSortBy}
	>
		<div class="w-full">
			<p
				class="font-bold text-content-muted text-{alignText} flex transition-colors duration-200"
			>
				{#if !isGhost}
					{title?.length ? title : column}
				{:else}
					<GhostText />
				{/if}
				{#if sortable && column.toLowerCase() === sortBy.toLowerCase() && !isGhost}
					<div
						class:bg-transparent={sortOrder === ''}
						class="flex justify-center items-center w-6 h-6 ml-2 rounded-md bg-brand transition-colors duration-200"
					>
						{#if sortOrder === 'asc'}
							<div>
								<img src="/arrow-up.svg" alt="arrow up" />
							</div>
						{/if}
						{#if sortOrder === 'desc'}
							<div>
								<img src="/arrow-down.svg" alt="arrow down" />
							</div>
						{/if}
						{#if sortOrder === ''}
							<p class="text-white"></p>
						{/if}
					</div>
				{/if}
			</p>
		</div>
	</button>
</th>
