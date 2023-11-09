<script>
  import * as C from "carbon-components-svelte";
  export let details, value
</script>

<div class="grid grid-cols-4 items-top gap-x-8 gap-y-2">
  <span class="text-right pt-3">{details.title}</span>
  <div class="col-span-3"><C.TextArea bind:value /></div>
  {#if details.isDescription}
  <div class="col-span-3 col-start-2">{@html details.description}</div>
  {/if}
</div>