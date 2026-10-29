<script>
	export let size = 'large';
	export let isSubmitting = false;
</script>

<button
	type="submit"
	disabled={isSubmitting}
	class:w-32={size === 'small'}
	class:w-36={size === 'medium'}
	class:w-60={size === 'large'}
	class="bg-brand text-[#04231b] hover:bg-brand/90 px-3 py-1.5 self-end text-sm font-medium flex justify-center items-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:opacity-50"
	on:click
>
	{#if isSubmitting}
		<div
			class="mr-2 w-4 h-4 border-t-2 border-t-white border-r-2 border-r-white border-b-white border-b-2 border-l-transparent border-l-2 rounded-xl animate-spin"
		></div>
	{:else}
		<slot />
	{/if}
</button>
