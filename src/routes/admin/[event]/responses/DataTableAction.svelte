<script lang="ts">
  import { EllipsisVertical, Download, Eye, FileOutput, FileSearch, Minimize2 } from "lucide-svelte"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
  import { Button } from "$lib/components/ui/button"
  import * as Dialog from "$lib/components/ui/dialog"
  import type { ApplicationsResponse } from "$lib/pocketbase-types"
  import { Checkbox } from "$lib/components/ui/checkbox"
  import { Badge } from "$lib/components/ui/badge"
  import * as Table from "$lib/components/ui/table"
  import { HyperFormula } from 'hyperformula'
  import * as Alert from "$lib/components/ui/alert"
  import { toast } from "svelte-sonner"
  import { fly } from "svelte/transition"
  import { enhance } from '$app/forms'
  import { Input } from "$lib/components/ui/input"
  import * as AlertDialog from "$lib/components/ui/alert-dialog"
  import { Textarea } from "$lib/components/ui/textarea"
  import { invalidateAll } from "$app/navigation"
  
  export let application: ApplicationsResponse

  const getTableValues = value => {
    const tableValues = value.map(row => row.map(cell => cell.value))
    const hfInstance = HyperFormula.buildFromArray(tableValues, { licenseKey: 'gpl-v3' })
    return hfInstance.getSheetValues(0)
  }

  let selected: boolean[] = []
  let messages: string[] = []
  let isSaving: boolean = false
  $: selectedValues = selected.map((i, idx) => i ? idx : null).filter(i => i != null)
  $: review = selectedValues.map(i => ({
    question: i,
    message: messages[i]
  }))

  let open = false
  let approveOpen = false
  let rejectOpen = false
</script>

{#if selected.some(i => i == true) && open}
<div transition:fly={{ duration: 200, y: 50 }} class="fixed inset-x-0 mx-auto bottom-4 max-w-md z-[51]">
  <Alert.Root>
    <FileOutput size="16" />
    <Alert.Title>Sending {selectedValues.map(i => i+1).join(', ')} back for review.</Alert.Title>
    <Alert.Description>
      <form class="mt-3" method="POST" action="?/review" use:enhance={() => {
        toast.loading('Returning...')
        isSaving = true
        return async ({ result }) => {
          if(result.type == 'success') {
            toast.success('Returned!')
            open = false
            selected = selected.map(i => false)
            invalidateAll()
          }
          else if (result.type == 'error') toast.error(result.error.message)
          isSaving = false
        }
      }}>
        <input type="hidden" name="id" value={application.id} />
        <input type="hidden" name="review" value={JSON.stringify(review)} />
        <Button type="submit" size="sm" class="w-full" disabled={isSaving}>
          Send review
        </Button>
      </form>
    </Alert.Description>
  </Alert.Root>
</div>
{/if}

{#if !selected.some(i => i == true) && open}
<div transition:fly={{ duration: 200, y: 50 }} class="fixed inset-x-0 mx-auto bottom-4 max-w-md z-[51]">
  <Alert.Root>
    <FileSearch size="16" />
    <Alert.Title>Application actions</Alert.Title>
    <Alert.Description>
      <div class="flex gap-1 mt-3">
        <AlertDialog.Root bind:open={rejectOpen}>
          <AlertDialog.Trigger asChild let:builder>
            <Button class="flex-1" builders={[builder]} variant="outline" disabled={approveOpen || rejectOpen}>
              Reject
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title>Application rejection confirmation</AlertDialog.Title>
              <AlertDialog.Description>
                <form method="POST" action="?/reject" use:enhance={() => {
                  toast.loading('Returning...')
                  isSaving = true
                  return async ({ result }) => {
                    if(result.type == 'success') {
                      toast.success('Returned!')
                      open = false
                      rejectOpen = false
                      invalidateAll()
                    }
                    else if (result.type == 'error') toast.error(result.error.message)
                    isSaving = false
                  }
                }}>
                  <Textarea placeholder="Message for rejection..." name="message" />
                  <input type="hidden" name="id" value={application.id} />
                  <div class="flex gap-1 w-full justify-end mt-2">
                    <Button variant="outline" disabled={isSaving} size="sm" on:click={() => {
                      rejectOpen = false
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="destructive" size="sm" disabled={isSaving}>
                      Reject
                    </Button>
                  </div>
                </form>
              </AlertDialog.Description>
            </AlertDialog.Header>
          </AlertDialog.Content>
        </AlertDialog.Root>

        <AlertDialog.Root bind:open={approveOpen}>
          <AlertDialog.Trigger asChild let:builder>
            <Button class="flex-1" builders={[builder]} disabled={approveOpen || rejectOpen}>
              Approve
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
              <AlertDialog.Description>
                <form method="POST" action="?/approve" use:enhance={() => {
                  toast.loading('Returning...')
                  isSaving = true
                  return async ({ result }) => {
                    if(result.type == 'success') {
                      toast.success('Returned!')
                      open = false
                      approveOpen = false
                      invalidateAll()
                    }
                    else if (result.type == 'error') toast.error(result.error.message)
                    isSaving = false
                  }
                }}>
                  <Textarea placeholder="Message for approval..." name="message" />
                  <input type="hidden" name="id" value={application.id} />
                  <div class="flex gap-1 w-full justify-end mt-2">
                    <Button variant="outline" disabled={isSaving} size="sm" on:click={() => {
                      approveOpen = false
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" disabled={isSaving}>
                      Approve
                    </Button>
                  </div>
                </form>
              </AlertDialog.Description>
            </AlertDialog.Header>
          </AlertDialog.Content>
        </AlertDialog.Root>

        <Button variant="outline" size="icon" on:click={() => {
          open = false
          approveOpen = false
          rejectOpen = false
        }}>
          <Minimize2 size="16" />
        </Button>
      </div>
    </Alert.Description>
  </Alert.Root>
</div>
{/if}

<div class="flex gap-1">
  <AlertDialog.Root bind:open={open}>
    <AlertDialog.Trigger asChild let:builder>
      <Button variant="outline" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
        <Eye size="16" />
      </Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content class="h-screen !max-w-xl overflow-auto pb-64">
      <AlertDialog.Header>
        <AlertDialog.Title>
          Application response
        </AlertDialog.Title>
        <AlertDialog.Description>
          {application.expand.responder.username} / {application.expand.responder.email}
        </AlertDialog.Description>
      </AlertDialog.Header>
      <div class="flex flex-col gap-12">
      {#each application.response as item, idx}
        <div class="flex gap-4">
          <Checkbox bind:checked={selected[idx]} />
          <div class="flex flex-col gap-2">
            {#if selected[idx]}
            <Input bind:value={messages[idx]} placeholder="Message for review..." />
            {/if}
            <span class="flex gap-1 text-muted-foreground text-sm">{idx+1}. {@html item.question}</span>
            
            {#if item.type == "File"}
            <div class="flex flex-col gap-1">
              {#each item.value as file}
              <Badge variant="outline">
                <a href={file.url} target="_blank" class="text-blue-600 underline">{file.file}</a>
              </Badge>
              {/each}
            </div>
            
            {:else if item.type == 'Image'}
            <div class="flex flex-col gap-1">
              {#each item.value as file}
              <a href={file.url} target="_blank" class="w-32 h-32 text-blue-600 underline border rounded-md p-2">
                <img src={file.url} alt={file.file} class="w-full h-full object-cover" />
              </a>
              {/each}
            </div>

            {:else if item.type == 'Checkbox' || item.type == 'Radio'}
            <div class="flex flex-col gap-1">
              {#each item.value as value}
                {#if value.value}
                <Badge variant="default">
                  {value.label ? value.label : "Others"}
                </Badge>
                {:else}
                <Badge variant="outline" class="text-muted-foreground">
                  {value.label ? value.label : "Others"}
                </Badge>
                {/if}
              {/each}
            </div>

            {:else if item.type == 'Member'}
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Head>ID</Table.Head>
                  <Table.Head>Name</Table.Head>
                  <Table.Head>Email</Table.Head>
                  <Table.Head class="text-right">Dept.</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {#each item.value as member}
                <Table.Row>
                  <Table.Cell class="font-medium">{member.id ?? ''}</Table.Cell>
                  <Table.Cell>{member.name ?? ''}</Table.Cell>
                  <Table.Cell>{member.email ?? ''}</Table.Cell>
                  <Table.Cell class="text-right">{member.dept ?? ''}</Table.Cell>
                </Table.Row>
                {/each}
              </Table.Body>
            </Table.Root>

            {:else if item.type == 'Table'}
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  {#each item.value.th as header}
                  <Table.Head>{header}</Table.Head>
                  {/each}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {#each getTableValues(item.value.tbody) as row}
                <Table.Row>
                  {#each row as cell}
                  <Table.Cell>{cell}</Table.Cell>
                  {/each}
                </Table.Row>
                {/each}
              </Table.Body>
            </Table.Root>
            
            {:else}
              <span class="break-words">{item.value}</span>
            {/if}

          </div>
        </div>
      {/each}
      </div>
    </AlertDialog.Content>
  </AlertDialog.Root>

  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button
        variant="outline"
        builders={[builder]}
        size="icon"
        class="relative h-8 w-8 p-0"
      >
        <Download size="16" />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item target="_blank" href={`/api/csv?event=${application.event}&ids=${application.id}`}>
        Download as CSV
      </DropdownMenu.Item>
      <DropdownMenu.Item disabled>
        Download as PDF
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
  
   
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button
        variant="outline"
        builders={[builder]}
        size="icon"
        class="relative h-8 w-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <EllipsisVertical class="h-4 w-4" />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item></DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>  
</div>