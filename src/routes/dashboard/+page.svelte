<script>
  import { onMount } from 'svelte'
  import * as C from "carbon-components-svelte";
  import { format } from 'timeago.js'

  import Launch from "carbon-icons-svelte/lib/Launch.svelte";
  import Edit from "carbon-icons-svelte/lib/Edit.svelte";
  import View from "carbon-icons-svelte/lib/View.svelte";

  export let data
  $: ({ user, records, applications } = data)
  $: recordsObj = records.reduce((a, i) => {
    const { id, ...others } = i;
    a[id] = others
    return a
  }, {})

  let appList, pendingApp = [], completedApp = []

  onMount(() => {
    appList = records.map((i, idx) => ({
      id: idx,
      name: i.name,
      start: format(new Date(i.start)),
      end: format(new Date(i.end)),
      link: '/application/'+i.id,
    }))

    pendingApp = applications.filter(i => !i.expand.status[0].complete)
    completedApp = applications.filter(i => i.expand.status[0].complete)
  })
  
  let open = false;

</script>

<div class="p-8">
  <div class="py-4 flex items-center justify-between">
    <h1>Hi, { user.username }</h1>
    <C.Button on:click={() => open = true}>New Application</C.Button>
  </div>
  <C.Tabs>
    <C.Tab label="Pending" />
    <C.Tab label="Completed" />
    <svelte:fragment slot="content">
      <C.TabContent>
        {#if pendingApp.length == 0}
        <h2>No pending applications</h2>
        {/if}
        {#each pendingApp as { id, collectionName, serial, 0: title, expand: { status } }}
        <C.Tile>
          <div class="flex justify-between">
            <div class="flex flex-col gap-1">
              <span class="font-bold" style:color={status[0].color}>{status[0].title}</span>
              <span class="text-xl">
                {recordsObj[collectionName].idprefix + serial.padStart(3, '0')} - {title}
              </span>
            </div>
            <div class="flex gap-2">
              <C.Button href={'/application/' + collectionName + '/view/' + id} kind="tertiary" iconDescription="View" icon={View} />
              <C.Button href={'/application/' + collectionName + '/edit/' + id} kind="tertiary" iconDescription="Edit" icon={Edit} disabled={status[0].id != 'review_______st'} />
            </div>
          </div>
        </C.Tile>
        <hr>
        {/each}
      </C.TabContent>
      <C.TabContent>
        {#if pendingApp.length == 0}
        <h2>No completed applications</h2>
        {/if}
        {#each completedApp as { id, collectionName, serial, 0: title, expand: { status } }}
        <C.Tile>
          <div class="flex justify-between">
            <div class="flex flex-col gap-1">
              <span class="font-bold" style:color={status[0].color}>{status[0].title}</span>
              <span class="text-xl">
                {recordsObj[collectionName].idprefix + serial.padStart(3, '0')} - {title}
              </span>
            </div>
            <div class="flex gap-2">
              <C.Button href={'/application/' + collectionName + '/view/' + id} kind="tertiary" iconDescription="View" icon={View} />
              <C.Button href={'/application/' + collectionName + '/edit/' + id} kind="tertiary" iconDescription="Edit" icon={Edit} disabled={status[0].id != 'review_______st'} />
            </div>
          </div>
        </C.Tile>
        <hr>
        {/each}
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