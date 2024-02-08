<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	
  export let items;
	export let onDrop;
  export { className as class }
  let className = undefined

	function handleConsider(e) {
		items = e.detail.items;
	}

	function handleFinalize(e) {
		onDrop(e.detail.items);
	}
</script>

<section class={className}
	use:dndzone={{
		items: items,
		flipDurationMs: 300,
		dropTargetClasses: ['outline', 'rounded-lg'],
		dropTargetStyle: {},
	}}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
>
	{#each items as item, idx (item['id'])}
	<div animate:flip={{ duration: 300 }}>
		<slot {item} {idx} />
	</div>
	{/each}
</section>