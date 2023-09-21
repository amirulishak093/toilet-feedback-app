<script>
	import Header from '$lib/components/header.svelte';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import { isLoading } from '$lib/store';

	import '../app.css';
	import '@fontsource/poppins';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/700.css';
	import { fade } from 'svelte/transition';
</script>

<html lang="eng" data-theme="cupcake">
	<div class="bg-[#FFFBD8] relative min-h-screen">
		<Header />
		{#if $isLoading}
			<LoadingSpinner />
		{:else}
			<div class="pb-4" transition:fade={{ delay: 150, duration: 150 }}>
				<slot />
			</div>
		{/if}
	</div>
</html>
