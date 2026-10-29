<script>
	// dimmed visually mutes the row (e.g. for SCIM-disabled recipients)
	export let dimmed = false;
	// title is shown as a native hover tooltip on the row
	export let title = '';
</script>

<tr
	{title}
	class="table-row border-t border-hairline h-10 hover:bg-surface-overlay/40 transition-colors duration-200 {dimmed
		? 'opacity-50'
		: ''}"
>
	<slot />
</tr>
