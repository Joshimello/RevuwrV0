<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
	const forms = data.forms

	const go = (id: string) => {
		goto('/form/' + id);
	}
</script>

<div class="flex flex-col gap-4">
	{#each forms as { id, title, created, updated }}
		<div class="flex gap-4">
			<span>{created}</span>
			<span>{updated}</span>
			<span>{title}</span>
			<button on:click={() => go(id)}> go </button>
		</div>
	{/each}
</div>