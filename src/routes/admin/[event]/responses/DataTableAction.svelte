<script lang="ts">
  import { EllipsisVertical, Download, Eye, FileOutput } from "lucide-svelte"
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
</script>

{#if selected.some(i => i == true)}
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

<div class="flex gap-1">
  <Dialog.Root bind:open={open}>
    <Dialog.Trigger asChild let:builder>
      <Button variant="outline" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
        <Eye size="16" />
      </Button>
    </Dialog.Trigger>
    <Dialog.Content class="h-screen !max-w-xl overflow-auto pb-64">
      <Dialog.Header>
        <Dialog.Title>
          Application response
        </Dialog.Title>
        <Dialog.Description>
          {application.expand.responder.username} / {application.expand.responder.email}
        </Dialog.Description>
      </Dialog.Header>
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
    </Dialog.Content>
  </Dialog.Root>

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
      <DropdownMenu.Group>
        <DropdownMenu.Item>
          Copy payment ID
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>View customer</DropdownMenu.Item>
      <DropdownMenu.Item>View payment details</DropdownMenu.Item>
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
      <DropdownMenu.Group>
        <DropdownMenu.Item>
          Copy payment ID
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>View customer</DropdownMenu.Item>
      <DropdownMenu.Item>View payment details</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>  
</div>