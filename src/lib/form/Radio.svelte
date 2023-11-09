<script>
  import * as C from "carbon-components-svelte";
  export let details, value = ''
</script>

<div class="grid grid-cols-4 items-top gap-x-8 gap-y-2">
  <span class="text-right pt-3">{details.title}</span>
  <div class="col-span-3">
    <C.TileGroup bind:selected={value}>
      {#each details.selections as sel}
      <C.RadioTile value={sel}>{sel}</C.RadioTile>
      {/each}
    </C.TileGroup>
  </div>
  {#if details.isDescription}
  <div class="col-span-3 col-start-2">{@html details.description}</div>
  {/if}
</div>