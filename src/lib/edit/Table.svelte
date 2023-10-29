<script>
  import * as C from 'carbon-components-svelte';
  import Editor from '$lib/Editor.svelte'

  export let value
</script>

<div class="w-full">
  <C.Tile>
    <div class="flex flex-col pb-4 w-full">
      <C.TextInput light placeholder="Question title..." bind:value={value.title} />
      <C.TextInput readonly size="sm" placeholder="Sample short text input" />
      {#if value?.isDescription}
      <Editor placeholder="Question description..." bind:value={value.description} />
      {/if}
    </div>
    <div class="flex gap-4 w-max items-end">
      <C.Checkbox labelText="Description" bind:checked={value.isDescription} />
      <C.Checkbox labelText="Required" bind:checked={value.required} />
    </div>
  </C.Tile>
</div>