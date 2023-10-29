<script>
  import * as C from 'carbon-components-svelte';
  import Editor from '$lib/Editor.svelte'

  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";

  export let value

  value.selections = ['']
</script>

<div class="w-full">
  <C.Tile>
    <div class="flex flex-col pb-4 w-full">
      <C.TextInput light placeholder="Question title..." bind:value={value.title} />

      <div class="py-2">
        {#each value?.selections as selection, idx}
        <div class="flex items-center">
          <C.RadioButton disabled />
          <C.TextInput light placeholder="Selection value..." size="sm" bind:value={value.selections[idx]} />
          <C.Button size="sm" kind="danger-ghost" icon={TrashCan} tooltipPosition="left" iconDescription="Remove selection" on:click={() => {
            value.selections.splice(idx, 1)
            value = value
          }} />
        </div>
        {/each}
        <div class="pl-11">
          <C.Button size="sm" kind="ghost" icon={Add} on:click={() => {
            value.selections = [...value.selections, '']
          }}>Add selection</C.Button>
        </div>
        {#if value?.isOthers}
        <div class="flex items-center">
          <C.RadioButton disabled />
          <C.TextInput readonly placeholder="Sample other input" size="sm" />
        </div>
        {/if}
      </div>

      {#if value?.isDescription}
      <Editor placeholder="Question description..." bind:value={value.description} />
      {/if}
    </div>
    <div class="flex gap-4 w-max items-end">
      <C.Checkbox labelText="Others option" bind:checked={value.isOthers} />
      <C.Checkbox labelText="Description" bind:checked={value.isDescription} />
      <C.Checkbox labelText="Required" bind:checked={value.required} />
    </div>
  </C.Tile>
</div>