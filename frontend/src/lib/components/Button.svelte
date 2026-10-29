<script>
	export let backgroundColor = 'bg-brand text-[#04231b] hover:bg-brand/90';
	/*
	linear-gradient(#64a6e6, #9198e5);
	*/
	export let css = '';
	export let size = 'medium';
	export let disabled = false;
</script>

<button
	class="{backgroundColor} inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:opacity-50 {css}"
	class:w-32={size === 'small'}
	class:w-36={size === 'medium'}
	class:w-60={size === 'large'}
	class:disabled:opacity-50={disabled}
	class:dark:disabled:opacity-60={disabled}
	{disabled}
	on:click
>
	<slot />
</button>
