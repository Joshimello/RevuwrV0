<script>
  import { onMount } from 'svelte'
  import * as C from 'carbon-components-svelte';
  import { format } from 'timeago.js'
  import Launch from "carbon-icons-svelte/lib/Launch.svelte"
  import Editor from '$lib/Editor.svelte'

  export let data, form
  $: ({ id, name, questions, idcount, idprefix, records, mailas, replyto, statuses } = data)

  let selectedRowIds = []
  let mailopen = false, statusopen = false
  let mailcontent, selectedStatus
</script>

<div class="flex flex-col gap-8">
  <h2>Viewing {name} responses</h2>

  <C.DataTable
    sortable
    batchSelection
    bind:selectedRowIds
    headers={[
      { value: 'Serial ID', key: 'serial' },
      { value: 'Title', key: '0' },
      { value: 'Created', key: 'created' },
      { value: 'Updated', key: 'updated' },
      { value: 'Status', key: 'expand', sort: (a, b) => a.status[0].title.localeCompare(b.status[0].title) },
      { key: 'rid', empty: true },
      { key: 'overflow', empty: true },
    ]}
    rows={records.map((i, idx) => ({ ...i, rid: i.id, id: idx }))}>
    <svelte:fragment slot="cell" let:row let:cell>
      {#if cell.key == 'rid'}
      <C.Link icon={Launch} href={'/admin/' + id + '/responses/' + cell.value}>
        Details
      </C.Link>
      {:else if cell.key == 'serial'}
      {idprefix + cell.value.padStart(3, '0')}
      {:else if cell.key == 'created' || cell.key == 'updated'}
      {format(cell.value)}
      {:else if cell.key == 'expand'}
      <span class="font-bold" style:color={cell.value.status[0].color}>{cell.value.status[0].title}</span>
      {:else if cell.key == 'overflow'}
      <C.OverflowMenu flipped>
        <C.OverflowMenuItem/>
        <C.OverflowMenuItem/>
        <C.OverflowMenuItem/>
      </C.OverflowMenu>
      {:else}
        {cell.value}
      {/if}
    </svelte:fragment>
    <C.Toolbar>
      <C.ToolbarBatchActions>
        <C.Button on:click={() => statusopen = true}>Set status of selected</C.Button>
        <C.Button on:click={() => mailopen = true}>Mail to selected</C.Button>
      </C.ToolbarBatchActions>
      <C.ToolbarContent>
        <C.ToolbarSearch
          shouldFilterRows={(item, value) => {
            let searchVal = idprefix + item.serial.padStart(3, '0') + item[0]
            return searchVal.toLowerCase().includes(value.toLowerCase())
          }}
        />
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

<C.Modal
  bind:open={statusopen}
  modalHeading="Setting status of"
  passiveModal
>
  <span>{selectedRowIds.map(i => idprefix + records[i].serial.padStart(3, '0')).join(', ')}</span>
  <form action="?/mail" method="POST">
    <input value={selectedStatus} name="status" class="hidden" />
    <C.Dropdown
      class="mt-4 mb-16"
      bind:selectedId={selectedStatus}
      items={statuses}
      itemToString={(item) => {
        return item.title
      }}
    />
    <C.Button type="submit">Change status</C.Button>
  </form>
</C.Modal>

<C.Modal
  bind:open={mailopen}
  modalHeading="Sending mail"
  passiveModal
>
  <form action="?/mail" method="POST">
    <C.TextInput name="email" value={[...(new Set(selectedRowIds.map(i => records[i].expand.responder[0].email)))].join(', ')} placeholder="Receiver" readonly />
    <C.TextInput name="subject" placeholder="Subject" />
    <Editor placeholder="Content" bind:value={mailcontent} />
    <hr class="border-gray-500">
    <C.TextInput name="mailas" value={mailas} inline labelText="Will send as:" readonly/>
    <C.TextInput name="replyto" placeholder="Reply To" value={replyto} inline labelText="Will reply to:" />
    <div class="flex justify-end pt-4">
      <input class="hidden" value={mailcontent} name="content" />
      <C.Button type="submit" kind="primary">Send</C.Button>
    </div>
  </form>
</C.Modal>