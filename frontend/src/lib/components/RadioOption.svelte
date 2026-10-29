<script>
	// selectable bordered radio row with label and optional description
	export let checked = false;
	export let label = '';
	export let description = '';
</script>

<label
	class="flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors {checked
		? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-600'
		: 'border-hairline'}"
>
	<input
		type="radio"
		{checked}
		on:change
		class="mt-0.5 w-4 h-4 text-blue-600 bg-surface-overlay border-hairline focus:ring-blue-500 focus:ring-2"
	/>
	<div class="text-left flex-1">
		<span class="text-sm font-medium text-content block">{label}</span>
		{#if description}
			<span class="text-xs text-content-subtle block mt-0.5">{description}</span>
		{/if}
	</div>
</label>
