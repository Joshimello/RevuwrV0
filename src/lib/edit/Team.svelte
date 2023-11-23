<script>
  import * as C from 'carbon-components-svelte';
  import Editor from '$lib/Editor.svelte'
  import Add from 'carbon-icons-svelte/lib/Add.svelte';

  export let value

  if(!value.limitSize){
    value.limitSize = 2
  }

  if(!value.fields){
    value.fields = []
  }
</script>

<div class="w-full">
  <C.Tile>
    <div class="flex flex-col pb-4 w-full">
      <C.TextInput light placeholder="Question title..." bind:value={value.title} />
      <div class="flex gap-2">
        <C.TextInput placeholder="Email" readonly />
        {#each value.fields as field, idx}
        <C.TextInput light bind:value={value.fields[idx]} />
        {/each}
        <C.Button kind="ghost" size="small" icon={Add} on:click={() => {
          value.fields = [...value.fields, '']
        }}>Add field</C.Button>
      </div>
      {#if value?.isLimitSize}
      <div class="flex items-center gap-4">
        Min:
        <C.NumberInput light size="sm" bind:value={value.limitMin} min={2} />
        Max:
        <C.NumberInput light size="sm" bind:value={value.limitMax} min={2} />
      </div>
      {/if}
      {#if value?.isDescription}
      <Editor placeholder="Question description..." bind:value={value.description} />
      {/if}
    </div>
    <div class="flex gap-4 w-max items-end">
      <C.Checkbox labelText="Limit Team Size" bind:checked={value.isLimitSize} />
      <C.Checkbox labelText="Description" bind:checked={value.isDescription} />
    </div>
  </C.Tile>
</div>