<script>
  import { onMount } from 'svelte'
  import * as C from 'carbon-components-svelte';

  export let data, form
  $: ({ name, description, start, end, questions, collection } = data)

  let selectedRowIds, headers

  onMount(() => {
    headers = questions.map((i, idx) => ({ key: idx, value: i.details.title }))
    console.log(collection)
  })

</script>

<div class="flex flex-col gap-8">
  <h2>Viewing {name} responses</h2>

  <C.DataTable batchSelection bind:selectedRowIds headers={headers} rows={collection} sortable>
    <C.Toolbar>
      <C.ToolbarBatchActions>
        <C.Button>Save</C.Button>
      </C.ToolbarBatchActions>
      <C.ToolbarContent>
        <C.ToolbarSearch shouldFilterRows />
        <C.ToolbarMenu>
          <C.ToolbarMenuItem primaryFocus></C.ToolbarMenuItem>
          <C.ToolbarMenuItem hasDivider></C.ToolbarMenuItem>
        </C.ToolbarMenu>
      </C.ToolbarContent>
    </C.Toolbar>
    <svelte:fragment slot="cell" let:row let:cell>
      {#if ['Table', 'File'].includes(questions[cell.key].type)}
      ...
      {:else}
      {cell.value}
      {/if}
    </svelte:fragment>
  </C.DataTable>

</div>