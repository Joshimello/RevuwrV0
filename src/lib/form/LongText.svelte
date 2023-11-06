<script>
  import * as C from "carbon-components-svelte";
  import Editor from '$lib/Editor.svelte'

  export let value, details
  const { title, description, required, isDescription } = details

</script>

<C.Tile>
  <div class="flex flex-col w-full gap-1">
    <h4>{title} {required ? '*' : ''}</h4>
    <Editor bind:value />
    {#if isDescription}
    <div>{@html description}</div>
    {/if}
  </div>
</C.Tile>