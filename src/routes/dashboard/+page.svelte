<script>
  import * as C from "carbon-components-svelte";
  import { format } from 'timeago.js'

  import Launch from "carbon-icons-svelte/lib/Launch.svelte";

  export let data
  const { username, email, admin, records } = data;
  let appList = records.map((i, idx) => ({
    id: idx,
    name: i.name,
    start: format(new Date(i.start)),
    end: format(new Date(i.end)),
    link: '/application/'+i.id,
  }))
  
  let open = false;
  let filteredRowIds = [];

</script>

<div class="p-8">
  <div class="py-4 flex items-center justify-between">
    <h1>Hi, { username }</h1>
    <C.Button on:click={() => open = true}>New Application</C.Button>
  </div>
  <C.Tabs>
    <C.Tab label="Pending" />
    <C.Tab label="Completed" />
    <svelte:fragment slot="content">
      <C.TabContent>
        <h2>No pending applications</h2>
        <!-- <C.ClickableTile href="/">
          Carbon Design System
        </C.ClickableTile> -->
      </C.TabContent>
      <C.TabContent>
        <h2>No completed applications</h2>
      </C.TabContent>
    </svelte:fragment>
  </C.Tabs>
</div>

<C.Modal passiveModal bind:open modalHeading="New Application" on:open on:close>
  <C.DataTable
    sortable
    headers={[
      { key: "name", value: "Name" },
      { key: "start", value: "Start" },
      { key: "end", value: "Ending" },
      { key: "link", value: "Link", sort: false },
    ]}
    rows={appList}
  >
    <svelte:fragment slot="cell" let:row let:cell>
      {#if cell.key === 'link'}
        <C.Link icon={Launch} href={cell.value}>Apply Now</C.Link>
      {:else}
        {cell.value}
      {/if}
    </svelte:fragment>
    <C.Toolbar>
      <C.ToolbarContent>
        <C.ToolbarSearch
          persistent
          shouldFilterRows
        />
      </C.ToolbarContent>
    </C.Toolbar>
  </C.DataTable>
</C.Modal>