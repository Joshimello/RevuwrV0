<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table"
  import { readable } from "svelte/store"
  import * as Table from "$lib/components/ui/table"
  import type { ApplicationsResponse, EventsResponse } from "$lib/pocketbase-types"
  import DataTableAction from "./DataTableAction.svelte"
  import { addSortBy, addTableFilter, addSelectedRows, addColumnFilters } from "svelte-headless-table/plugins"
  import { Button } from "$lib/components/ui/button"
  import { ArrowUpDown, ListRestart } from "lucide-svelte"
  import { Input } from "$lib/components/ui/input"
  import DataTableCheckbox from "./DataTableCheckbox.svelte"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
  import { invalidateAll } from "$app/navigation"
	import { toast } from "svelte-sonner";
  import * as Select from "$lib/components/ui/select"

  export let event: EventsResponse
  export let records: ApplicationsResponse[]

  const table = createTable(readable(records), {
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
    select: addSelectedRows(),
    colFilter: addColumnFilters()
  })
  const columns = table.createColumns([
    table.column({
      id: "selector",
      accessor: "id",
      header: (_, { pluginStates }) => {
        const { allPageRowsSelected } = pluginStates.select;
        return createRender(DataTableCheckbox, {
          checked: allPageRowsSelected,
        });
      },
      cell: ({ row }, { pluginStates }) => {
        const { getRowState } = pluginStates.select;
        const { isSelected } = getRowState(row);
 
        return createRender(DataTableCheckbox, {
          checked: isSelected,
        });
      },
    }),
    table.column({
      id: "id",
      accessor: ({ application_id }) => event.settings.responsePrefix + application_id.toString(),
      header: "ID"
    }),
    table.column({ 
      id: "username", 
      accessor: ({ expand }) => expand.responder.username, 
      header: "Responder"
    }),
    table.column({ 
      id: "email", 
      accessor: ({ expand }) => expand.responder.email,
      header: "Responder"
    }),
    table.column({
      accessor: "status",
      header: "Status",
      plugins: {
        colFilter: {
          fn: ({ filterValue, value }) => filterValue === value,
        }
      },
    }),
    table.column({ 
      accessor: "updated_response", 
      header: "Updated",
      plugins: {
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      id: "actions",
      accessor: application => application, 
      header: "",
      cell: ({ value }) => {
        return createRender(DataTableAction, { application: value })
      },
      plugins: {
        filter: {
          exclude: true
        }
      }
    }),
  ])

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } = table.createViewModel(columns)
  const { filterValue } = pluginStates.filter
  const { selectedDataIds } = pluginStates.select
  const { preFilteredRows, filterValues } = pluginStates.colFilter
</script>

<div class="flex items-center py-4 gap-1">
  <Button variant="outline" size="icon" on:click={() => {
    invalidateAll()
    toast.success("Table refreshed!")
  }}>
    <ListRestart size="16" />
  </Button>
  <Input
    class="max-w-sm"
    placeholder="Search..."
    type="text"
    bind:value={$filterValue}
  />
  <Select.Root onSelectedChange={({ label, value }) => {
    if (value == "all") $filterValues.status = undefined
    else $filterValues.status = value
  }}>
    <Select.Trigger class="w-[180px]">
      <Select.Value placeholder="status" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="all">all</Select.Item>
      {#each [...new Set(records.map(i => i.status))] as status}
      <Select.Item value={status}>{status}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
</div>

<div class="rounded-md border">
  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
      <Subscribe rowAttrs={headerRow.attrs()}>
        <Table.Row>
          {#each headerRow.cells as cell (cell.id)}
          <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
            <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-4">
              {#if !['selector', 'actions'].includes(cell.id)}
              <Button variant="ghost" on:click={props.sort.toggle}>
                <Render of={cell.render()} />
                <ArrowUpDown class={"ml-2 h-4 w-4"} />
              </Button>
              {:else}
              <Render of={cell.render()} />
              {/if}
            </Table.Head>
          </Subscribe>
          {/each}
        </Table.Row>
      </Subscribe>
      {/each}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
      <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
        <Table.Row
          {...rowAttrs}
          data-state={$selectedDataIds[row.id] && "selected"}
        >
          {#each row.cells as cell (cell.id)}
          <Subscribe attrs={cell.attrs()} let:attrs>
            <Table.Cell {...attrs}>
              {#if cell.id == "updated_response"}
              {new Date(cell.value).toLocaleDateString('en-US', { 
                year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
              })}
              {:else}
              <Render of={cell.render()} />
              {/if}
            </Table.Cell>
          </Subscribe>
          {/each}
        </Table.Row>
      </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
</div>