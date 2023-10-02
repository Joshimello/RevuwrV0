<script lang="ts">
	import { title } from '$lib/stores/edit';
</script>

<div class="flex flex-col gap-1">
	<span> Title </span>
	<input class="bg-transparent border-2 rounded-lg p-2" bind:value={$title} />
</div>
