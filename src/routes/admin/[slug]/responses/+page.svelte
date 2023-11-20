<script>
  import { onMount } from 'svelte'
  import * as C from 'carbon-components-svelte';
  import { format } from 'timeago.js'
  import Launch from "carbon-icons-svelte/lib/Launch.svelte"

  export let data, form
  $: ({ id, name, questions, idcount, idprefix, records } = data)

  let selectedRowIds = []
</script>

<div class="flex flex-col gap-8">
  <h2>Viewing {name} responses</h2>

  <C.DataTable
    batchSelection
    bind:selectedRowIds
    headers={[
      { value: 'Serial ID', key: 'serial' },
      { value: 'Created', key: 'created' },
      { value: 'Updated', key: 'updated' },
      { value: 'Status', key: 'expand' },
      { value: '', key: 'id' },
    ]}
    rows={records}>
    <svelte:fragment slot="cell" let:row let:cell>
      {#if cell.key == 'id'}
      <C.Link icon={Launch} href={'/admin/' + id + '/responses/' + cell.value}>
        Details
      </C.Link>
      {:else if cell.key == 'serial'}
      {idprefix + cell.value.padStart(3, '0')}
      {:else if cell.key == 'created' || cell.key == 'updated'}
      {format(cell.value)}
      {:else if cell.key == 'expand'}
      <span class="font-bold" style:color={cell.value.status[0].color}>{cell.value.status[0].title}</span>
      {:else}
        {cell.value}
      {/if}
    </svelte:fragment>
    <C.Toolbar>
      <C.ToolbarBatchActions>
        <C.Button>Mail selected</C.Button>
      </C.ToolbarBatchActions>
      <C.ToolbarContent>
        <C.ToolbarSearch />
        <C.ToolbarMenu>
          <C.ToolbarMenuItem primaryFocus>A</C.ToolbarMenuItem>
          <C.ToolbarMenuItem>B</C.ToolbarMenuItem>
          <C.ToolbarMenuItem hasDivider danger>C</C.ToolbarMenuItem>
        </C.ToolbarMenu>
        <C.Button>Button</C.Button>
      </C.ToolbarContent>
    </C.Toolbar>
  </C.DataTable>

</div>