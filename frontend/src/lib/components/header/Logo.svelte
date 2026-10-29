<script>
	// Lockup de marca igual al de Cassiterion-SOC (frontend/src/BrandLockup.tsx):
	// cristal + wordmark "CASSITERION" con la E en tres barras doradas + tagline.
	import { goto } from '$app/navigation';

	export let size = 24;
	export let tagline = true;
</script>

<button
	type="button"
	on:click={() => goto('/dashboard/')}
	class="flex items-center gap-3 rounded-lg px-1 py-0.5 text-left transition hover:bg-surface-overlay"
	title="Dashboard"
>
	<div class="flex flex-col items-center">
		<div class="flex items-center" style="gap: {size * 0.5}px">
			<img
				src="/brand/cassiterion-symbol.svg"
				alt=""
				aria-hidden="true"
				draggable="false"
				style="height: {size * 1.7}px; filter: drop-shadow(0 0 6px rgba(197,164,107,0.3))"
			/>
			<div
				class="flex items-center text-content"
				style="font-size: {size}px; font-weight: 300; letter-spacing: 0.26em; margin-right: -0.26em; line-height: 1"
				aria-label="CASSITERION"
			>
				<span>CASSIT</span>
				<svg
					viewBox="0 0 12 16"
					aria-hidden="true"
					style="height: 0.72em; width: 0.58em; margin: 0 0.14em; flex-shrink: 0"
				>
					<rect x="0" y="0" width="12" height="2.4" fill="#C5A46B" />
					<rect x="0" y="6.8" width="10" height="2.4" fill="#C5A46B" />
					<rect x="0" y="13.6" width="12" height="2.4" fill="#C5A46B" />
				</svg>
				<span>RION</span>
			</div>
		</div>
		{#if tagline}
		<div
			class="text-brand"
			style="font-size: {size * 0.34}px; letter-spacing: 0.2em; margin-top: {size *
				0.42}px; margin-right: -0.2em; font-weight: 500"
		>
			AI-SOC&nbsp;&nbsp;|&nbsp;&nbsp;AGENTIC DEFENSE&nbsp;&nbsp;|&nbsp;&nbsp;ALWAYS AHEAD
		</div>
		{/if}
	</div>
</button>
