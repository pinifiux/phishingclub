<script>
	import ToolTip from './ToolTip.svelte';

	export let options = [];
	export let value = null;
	export let label = '';
	export let center = true;
	export let optional = false;
	export let toolTipText = '';
	export let width = 'medium';
	/** @type {*} */
	export let onChange = () => {};
</script>

<div class="flex flex-col gap-2 py-2">
	{#if label}
		<div class="flex flex-row items-center">
			<div class="font-semibold text-content-muted transition-colors duration-200">
				{label}
			</div>
			{#if toolTipText.length > 0}
				<ToolTip>
					{toolTipText}
				</ToolTip>
			{/if}
			{#if optional}
				<div
					class="bg-surface-overlay ml-2 px-2 rounded-md transition-colors duration-200 h-6 flex items-center"
				>
					<p class="text-content-muted text-xs">optional</p>
				</div>
			{/if}
		</div>
	{/if}

	<div class="flex gap-4 py-2" class:justify-center={center}>
		{#each options as option}
			<button
				type="button"
				class:h32={option.icon && option.description}
				class:h16={!option.icon && !option.description}
				class:w-28={width === 'small'}
				class:w-40={width === 'medium'}
				class:w-64={width === 'large'}
				class={`
          p-3 rounded-lg border-2 transition-all duration-200
          flex flex-col items-center justify-center text-center
          w-40
          hover:border-blue-300 dark:hover:border-highlight-blue/80 hover:bg-blue-50 dark:hover:bg-highlight-blue/20
          ${
						value === option.value
							? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-800/40 text-green-700 dark:text-green-300'
							: 'border-hairline bg-white dark:bg-gray-900/60 text-content-muted'
					}
        `}
				on:click={() => {
					value = option.value;
					onChange();
				}}
			>
				{#if option.icon}
					<span class="text-xl mb-2">{option.icon}</span>
				{/if}
				<span class="font-medium text-sm">{option.label}</span>
				{#if option.description}
					<span class="text-xs text-content-subtle mt-1 transition-colors duration-200"
						>{option.description}</span
					>
				{/if}
			</button>
		{/each}
	</div>
</div>
