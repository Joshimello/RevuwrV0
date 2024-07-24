<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table"
  import { readable } from "svelte/store"
  import * as Table from "$lib/components/ui/table"
  import type { ApplicationsResponse, EventsResponse } from "$lib/pocketbase-types"
  import DataTableAction from "./DataTableAction.svelte"
  import { addSortBy, addTableFilter, addSelectedRows, addColumnFilters, addHiddenColumns } from "svelte-headless-table/plugins"
  import { Button } from "$lib/components/ui/button"
  import { ArrowUpDown, Download, ListRestart, SquareCheckBig, ListChecks, Send, ChevronDown } from "lucide-svelte"
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
  import { Textarea } from "$lib/components/ui/textarea"
  import DatePicker from "$lib/components/DatePicker.svelte"
  import { Checkbox } from "$lib/components/ui/checkbox"
  import * as Popover from "$lib/components/ui/popover"
  import { ScrollArea } from "$lib/components/ui/scroll-area"
	import { onMount } from "svelte";
	import { browser } from "$app/environment";

  export let event: EventsResponse
  export let records: ApplicationsResponse[]

  const table = createTable(readable(records), {
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
    select: addSelectedRows(),
    colFilter: addColumnFilters(),
    hide: addHiddenColumns()
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
      id: "dbid",
      accessor: ({ id }) => id.toString(),
      header: "Database ID"
    }),
    table.column({
      id: "id",
      accessor: ({ application_id }) => event.settings.responsePrefix + application_id.toString(),
      header: "ID"
    }),
    table.column({ 
      id: "username", 
      accessor: ({ expand }) => expand.responder.username, 
      header: "Responder ID"
    }),
    table.column({ 
      id: "email", 
      accessor: ({ expand }) => expand.responder.email,
      header: "Responder Email"
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
    })
  ])

  event.questions.forEach((q, idx) => 
    columns.push(
      table.column({
        id: q.id,
        accessor: ({ response }) => {
          if (!response) return null
          const r = response.find(r => r.id == q.id)
          if (!r) return null

          if (r.type == 'Checkbox') {
            let ans: string[] = []
            r.value.forEach((v, idx) => {
              if (v.value) ans.push(v.label)
            })
            return ans.join(', ')
          }

          if (r.type == 'Radio') {
            let ans: string = ''
            r.value.forEach((v, idx) => {
              if (v.value) ans = v.label
            })
            return ans
          }

          if (r.type == 'File') {
            return r.value.map(i => i.url).join(', ')
          }

          if (r.type == 'Image') {
            return r.value.map(i => i.url).join(', ')
          }

          if (r.type == 'Member') {
            return r.value.map(i => i.email).join(', ')
          }

          if (r.type == 'Table') {
            return r.value.tbody.map(i => i.map(j => j.value).join(', ')).join('; ')
          }

          return r.value
        },
        header: q.value.question.replace(/<[^>]*>?/gm, '').substring(0, 16) + (q.value.question.length > 16 ? '...' : ''),
        plugins: {
          filter: {
            exclude: true
          }
        }
      })
    )
  )

  columns.push(table.column({
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
  }))

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } = table.createViewModel(columns)
  const { filterValue } = pluginStates.filter
  const { selectedDataIds } = pluginStates.select
  const { preFilteredRows, filterValues } = pluginStates.colFilter
  const { hiddenColumnIds } = pluginStates.hide

  const ids = flatColumns.map((col) => col.id)
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]))
  hideForId['dbid'] = false
  event.questions.forEach(q => hideForId[q.id] = false)

  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id)

  let firstLoaded = false

  $: if (browser && firstLoaded) {
    localStorage.setItem('hiddenColumnIds', JSON.stringify($hiddenColumnIds))
    console.log(localStorage.getItem('hiddenColumnIds'))
  }

  onMount(() => {
    if (browser) {
      const hiddenColumnIds = JSON.parse(localStorage.getItem('hiddenColumnIds') ?? '')
      if (hiddenColumnIds) {
        console.log('hiddenColumnIdsFromDB', hiddenColumnIds)
        $hiddenColumnIds = hiddenColumnIds
        for (const id of hiddenColumnIds) {
          hideForId[id] = false
        }
      }
      firstLoaded = true
    }
  })

  const hidableCols = ['dbid', 'id', 'username', 'email', 'status', 'updated_response', ...event.questions.map(q => q.id)]

  let isSaving = false
  let reviewData = null
</script>

{#if Object.keys($selectedDataIds).length > 0}
<div transition:fly={{ duration: 200, y: 50 }} class="fixed inset-x-0 mx-auto bottom-4 max-w-md">
  <Alert.Root>
    <SquareCheckBig size="16" />
    <Alert.Title>Selected {Object.keys($selectedDataIds).length} application{Object.keys($selectedDataIds).length > 1 ? 's' : ''}</Alert.Title>
    <Alert.Description>
        <div class="flex gap-1">
          <Dialog.Root onOpenChange={state => {
            if (reviewData && !state) reviewData = null
          }}>
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
              <form class="mt-3" method="POST" action="?/sendreview" use:enhance={() => {
                toast.loading('Sending...')
                isSaving = true
                return async ({ result }) => {
                  if(result.type == 'success') {
                    toast.success('Sent!')
                    reviewData = result.data
                  }
                  else if (result.type == 'error') toast.error(result.error.message)
                  isSaving = false
                }
              }}>
                <Dialog.Header>
                  <Dialog.Title>Sending out {Object.keys($selectedDataIds).length} applications for review</Dialog.Title>
                </Dialog.Header>
                <input type="hidden" name="ids" value={Object.keys($selectedDataIds).map(i => records[i].id).join(',')} />
                {#if reviewData}
                  <span>
                    Share this URL with the reviewer: 
                    <a href={`/review/${reviewData.id}`} target="_blank" class="text-blue-500">
                      /review/{reviewData.id}
                    </a>
                  </span>
                {:else}
                  <div class="flex flex-col mt-4">
                    <span class="text-sm mb-1">Due date</span>
                    <DatePicker />
                    <span class="mt-4 text-sm">Permissions</span>
                    <div class="flex flex-col">
                      <div class="flex gap-2 items-center">
                        <Checkbox />
                        <span>Allow approve & reject</span>
                      </div>
                      <div class="flex gap-2 items-center">
                        <Checkbox />
                        <span>Allow commenting</span>
                      </div>
                    </div>
                    <span class="mt-4 text-sm">Viewable fields</span>
                    <Popover.Root>
                      <Popover.Trigger asChild let:builder>
                        <Button builders={[builder]} variant="outline" size="sm" class="w-max">Select fields</Button>
                      </Popover.Trigger>
                      <Popover.Content>
                        <ScrollArea class="h-48">
                          <div class="flex flex-col gap-2">
                            {#each flatColumns as col}
                              {#if !['selector', 'actions'].includes(col.id)}
                                <div class="flex gap-2 items-center">
                                  <Checkbox />
                                  <span>{col.header}</span>
                                </div>
                              {/if}
                            {/each}
                          </div>
                        </ScrollArea>
                      </Popover.Content>
                    </Popover.Root>

                    
                    <Button type="submit" class="mt-4">Send for review</Button>
                  </div>
                {/if}
              </form>
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
  <DropdownMenu.Root closeOnItemClick={false}>
    <DropdownMenu.Trigger asChild let:builder>
      <Button variant="outline" class="ml-auto" builders={[builder]}>
        Display <ChevronDown class="ml-2 h-4 w-4" />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      {#each flatColumns as col}
        {#if hidableCols.includes(col.id)}
          <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
            {col.header}
          </DropdownMenu.CheckboxItem>
        {/if}
      {/each}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
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