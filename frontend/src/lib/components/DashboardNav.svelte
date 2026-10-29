<script>
	import { page } from '$app/stores';

	// determine active tab based on current route
	// normalize path to handle trailing slashes
	$: currentPath = $page.url.pathname.replace(/\/$/, '') || '/';
</script>

<nav class="mt-4 mb-6 border-b border-hairline">
	<div class="flex">
		<a
			href="/dashboard"
			class="-mb-px px-3 py-2 text-sm font-medium border-b-2 transition-colors
				{currentPath === '/dashboard'
				? 'border-brand text-content'
				: 'border-transparent text-content-muted hover:text-content'}"
		>
			Overview
		</a>
		<a
			href="/dashboard/campaigns"
			class="-mb-px px-3 py-2 text-sm font-medium border-b-2 transition-colors
				{currentPath === '/dashboard/campaigns'
				? 'border-brand text-content'
				: 'border-transparent text-content-muted hover:text-content'}"
		>
			Campaigns
		</a>
		<a
			href="/dashboard/events"
			class="-mb-px px-3 py-2 text-sm font-medium border-b-2 transition-colors
				{currentPath === '/dashboard/events'
				? 'border-brand text-content'
				: 'border-transparent text-content-muted hover:text-content'}"
		>
			Events
		</a>
	</div>
</nav>
