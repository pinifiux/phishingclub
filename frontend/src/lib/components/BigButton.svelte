<script>
	export let disabled = false;
	/** @type {'button'|'submit'} */
	export let type = 'button';
</script>

<button
	{disabled}
	class="self-start mt-6 mb-10 w-56 inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium bg-brand text-[#04231b] hover:bg-brand/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/40"
	on:click
	class:opacity-50={disabled}
	class:dark:opacity-60={disabled}
	class:cursor-not-allowed={disabled}
	{type}
>
	<slot />
</button>
