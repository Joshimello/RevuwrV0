<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table"
  import { readable } from "svelte/store"
  import * as Table from "$lib/components/ui/table"
  import type { ApplicationsResponse, EventsResponse } from "$lib/pocketbase-types"
  import DataTableAction from "./DataTableAction.svelte"
  import { addSortBy, addTableFilter, addSelectedRows, addColumnFilters } from "svelte-headless-table/plugins"
  import { Button } from "$lib/components/ui/button"
  import { ArrowUpDown, Download, ListRestart, SquareCheckBig, ListChecks, Send } from "lucide-svelte"
  import { Input } from "$lib/components/ui/input"
  import DataTableCheckbox from "./DataTableCheckbox.svelte"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
  import { invalidateAll } from "$app/navigation"
	import { toast } from "svelte-sonner";
  import * as Select from "$lib/components/ui/select"
  import * as Alert from "$lib/components/ui/alert"
  import { fly } from "svelte/transition"
  import { enhance } from "$app/forms"
  import * as Dialog from "$lib/components/ui/dialog"

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

  let isSaving = false
</script>

{#if Object.keys($selectedDataIds).length > 0}
<div transition:fly={{ duration: 200, y: 50 }} class="fixed inset-x-0 mx-auto bottom-4 max-w-md">
  <Alert.Root>
    <SquareCheckBig size="16" />
    <Alert.Title>Selected {Object.keys($selectedDataIds).length} application{Object.keys($selectedDataIds).length > 1 ? 's' : ''}</Alert.Title>
    <Alert.Description>
      <form class="mt-3" method="POST" action="?/review" use:enhance={() => {
        toast.loading('Returning...')
        isSaving = true
        return async ({ result }) => {
          if(result.type == 'success') {
            toast.success('Returned!')
          }
          else if (result.type == 'error') toast.error(result.error.message)
          isSaving = false
        }
      }}>
        <input type="hidden" name="review" value={""} />
        <div class="flex gap-1">
          <Dialog.Root>
            <Dialog.Trigger asChild let:builder>
              <Button
                builders={[builder]}
                variant="outline"
                size="icon"
              >
                <Send size="16" />
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
                <Dialog.Description>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </Dialog.Description>
              </Dialog.Header>
            </Dialog.Content>
          </Dialog.Root>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
              <Button
                variant="outline"
                builders={[builder]}
                size="icon"
              >
                <ListChecks size="16" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Set statuses to</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>
                Approved
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                Rejected
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                Reviewed
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                Draft
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
              <Button
                variant="outline"
                builders={[builder]}
                size="icon"
              >
                <Download size="16" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item target="_blank" href={`/api/csv?event=${event.id}&ids=${Object.keys($selectedDataIds).map(i => records[+i].id).join(",")}`}>
                Download as CSV
              </DropdownMenu.Item>
              <DropdownMenu.Item disabled>
                Download as PDF
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </form>
    </Alert.Description>
  </Alert.Root>
</div>
{/if}

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