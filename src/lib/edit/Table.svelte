<script>
  import * as C from 'carbon-components-svelte';
  import Editor from '$lib/Editor.svelte'

  import Edit from "carbon-icons-svelte/lib/Edit.svelte";
  import TextFootnote from "carbon-icons-svelte/lib/TextFootnote.svelte"
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import Calculation from "carbon-icons-svelte/lib/Calculation.svelte"
  import Add from "carbon-icons-svelte/lib/Add.svelte";

  let isEdit = false

  export let value

  if (!value.table) {
    value.table = [
      [
        {type: 'text', value: 'Katsudon'}, 
        {type: 'input', value: ''}, 
        {type: 'formula', value: '=B1 * 90'}
      ], [
        {type: 'text', value: 'Matcha'},
        {type: 'input', value: ''},
        {type: 'formula', value: '=B2 * 30'}
      ], [
        {type: 'text', value: 'Total'}, 
        {type: 'text', value: ''}, 
        {type: 'formula', value: '=SUM(C1:C2)'}
      ]
    ]
  }

</script>

<div class="w-full">
  <C.Tile>
    <div class="flex flex-col pb-4 w-full">
      <C.TextInput light placeholder="Question title..." bind:value={value.title} />
      
      <div class="flex gap-2">
        <div class="flex flex-col gap-2 py-2 w-full">
          {#if isEdit}
          <div class="flex justify-around w-full pl-8">
            {#each value.table[0] as col, j}
            <div class="w-full px-2">
              <C.Button size="small" kind="danger-tertiary" iconDescription="Delete column" icon={TrashCan} on:click={() => {
                value.table.forEach(i => i.splice(j, 1))
                value.table = value.table
              }} />
            </div>
            {/each}
          </div>
          {/if}
          {#each value.table as row, i}
          <div class="flex gap-2">
            {#if isEdit}
            <C.Button size="small" kind="danger-tertiary" iconDescription="Delete row" icon={TrashCan} on:click={() => {
              value.table.splice(i, 1)
              value.table = value.table
            }} />
            {/if}
            {#each row as item, j}
            <div class="w-full flex">
              <C.TextInput light readonly={item.type == 'input'} bind:value={value.table[i][j].value}/>
              {#if item.type == 'text'}
              <C.Button size="small" kind="tertiary" iconDescription="Text" icon={TextFootnote} on:click={() => {
                value.table[i][j].type = 'input'
              }} />
              {:else if item.type == 'input'}
              <C.Button size="small" kind="tertiary" iconDescription="Input" icon={Edit} on:click={() => {
                value.table[i][j].type = 'formula'
              }} />
              {:else if item.type == 'formula'}
              <C.Button size="small" kind="tertiary" iconDescription="Formula" icon={Calculation} on:click={() => {
                value.table[i][j].type = 'text'
              }} />
              {/if}
            </div>
            {/each}
          </div>
          {/each}
          {#if isEdit}
          <div class="flex justify-end">
            <C.Button size="small" kind="tertiary" iconDescription="Add row" icon={Add} on:click={() => {
              value.table = [...value.table, new Array(value.table[0].length).fill().map(a => ({type: 'text', value: ''}))]
            }}></C.Button>
          </div>
          {/if}
        </div>
        {#if isEdit}
        <div class="pt-12 pb-10 flex">
          <C.Button size="small" kind="tertiary" iconDescription="Add column" icon={Add} on:click={() => {
            value.table = value.table.map(i => [...i, {type: 'text', value: ''}])
          }}></C.Button>
        </div>
        {/if}
      </div>
      {#if value?.isDescription}
      <Editor placeholder="Question description..." bind:value={value.description} />
      {/if}
    </div>
    <div class="flex gap-4 w-max items-end">
      <C.Checkbox labelText="Edit table" bind:checked={isEdit} />
      <C.Checkbox labelText="Description" bind:checked={value.isDescription} />
      <C.Checkbox labelText="Required" bind:checked={value.required} />
    </div>
  </C.Tile>
</div>