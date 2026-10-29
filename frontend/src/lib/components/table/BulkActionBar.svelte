<script>
	import { createEventDispatcher } from 'svelte';
	import Button from '../Button.svelte';

	export let count = 0;
	export let noun = 'item';
	export let nounPlural = `${noun}s`;

	const dispatch = createEventDispatcher();

	$: label = `${count} ${count === 1 ? noun : nounPlural} selected`;
</script>

{#if count > 0}
	<div
		class="flex items-center gap-4 mb-4 px-4 py-3 rounded-md border-2 border-hairline bg-surface-raised transition-colors duration-200"
	>
		<span class="font-medium text-content-muted transition-colors duration-200">
			{label}
		</span>
		<div class="flex items-center gap-3 ml-auto">
			<Button size="small" backgroundColor="bg-danger text-white hover:bg-danger/90" on:click={() => dispatch('delete')}>
				Delete
			</Button>
			<button
				class="text-sm font-semibold uppercase text-content-muted hover:opacity-80 transition-all duration-200"
				on:click={() => dispatch('clear')}
			>
				Clear
			</button>
		</div>
	</div>
{/if}
