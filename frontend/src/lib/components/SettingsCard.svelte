<script>
	// reusable settings panel card: title, body slot, optional footer slot.
	// fixed comfortable width so panels can wrap cards consistently.
	export let title = '';
export let widthClass = 'w-full sm:w-96';
</script>

<div
	class="bg-surface-raised p-5 rounded-xl border border-hairline flex flex-col {widthClass}"
>
	<h2
		class="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-content-muted"
	>
		{title}
	</h2>
	<div class="flex flex-col flex-1">
		<slot />
	</div>
	{#if $$slots.footer}
		<div class="mt-auto pt-6 flex justify-end">
			<slot name="footer" />
		</div>
	{/if}
</div>
