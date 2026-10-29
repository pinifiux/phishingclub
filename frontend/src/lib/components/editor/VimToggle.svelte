<script>
	import { vimModeEnabled, toggleVimMode } from '$lib/store/vimMode.js';
</script>

<button
	type="button"
	on:click={toggleVimMode}
	class="h-8 border-2 border-hairline rounded-md px-3 text-center cursor-pointer hover:opacity-80 flex items-center justify-center gap-2 bg-surface-raised text-content-muted transition-colors duration-200"
	class:font-bold={$vimModeEnabled}
	class:bg-cta-blue={$vimModeEnabled}
	class:dark:bg-indigo-600={$vimModeEnabled}
	class:text-white={$vimModeEnabled}
	title={$vimModeEnabled ? 'Disable vim mode' : 'Enable vim mode'}
>
	<span>Vim</span>
</button>
