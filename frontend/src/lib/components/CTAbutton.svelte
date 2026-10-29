<script>
	export let disabled = false;
	/**
     * @type {"submit" | "button" | "reset"}

     */
	export let type = 'submit';
</script>

<div class="mt-5 w-full">
	<button
		{disabled}
		{type}
		class="w-full rounded-md bg-brand px-3 py-2.5 text-sm font-semibold text-[#04231b] transition hover:brightness-110 disabled:opacity-50"
		>Sign in</button
	>
</div>
