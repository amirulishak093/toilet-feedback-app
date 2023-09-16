<script>
	import { fade } from 'svelte/transition';
</script>

<span
	transition:fade={{ delay: 150, duration: 150 }}
	class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-spinner loading-lg"
/>
