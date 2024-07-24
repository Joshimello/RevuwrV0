<script lang=ts>
  import { Separator } from "$lib/components/ui/separator"
  import * as Table from "$lib/components/ui/table"
  import * as AlertDialog from "$lib/components/ui/alert-dialog"
  import { Badge } from "$lib/components/ui/badge"
  import { Button } from "$lib/components/ui/button"
  import { Checkbox } from "$lib/components/ui/checkbox"
  import { Input } from "$lib/components/ui/input"
  import { Eye, FileOutput, Minimize2, FileSearch, Check, X, MessageCircle } from "lucide-svelte"
  import { HyperFormula } from 'hyperformula'
  import * as Alert from "$lib/components/ui/alert"
  import { fly } from "svelte/transition"
  import { enhance } from '$app/forms'
  import { toast } from "svelte-sonner"
  import { invalidateAll } from "$app/navigation"
  import * as Dialog from "$lib/components/ui/dialog"
	import { Textarea } from "$lib/components/ui/textarea";

  export let data

  const event = data.expand.applications[0].expand.event

  const getTableValues = value => {
    const tableValues = value.map(row => row.map(cell => cell.value))
    const hfInstance = HyperFormula.buildFromArray(tableValues, { licenseKey: 'gpl-v3' })
    return hfInstance.getSheetValues(0)
  }

  let selected: boolean[] = []
  let messages: string[] = []
  let isSaving: boolean = false
  let focus: string = ''
  $: selectedValues = selected.map((i, idx) => i ? idx : null).filter(i => i != null)
  $: review = selectedValues.map(i => ({
    question: i,
    message: messages[i]
  }))

  let open = false
  let statuses: string[] = []
  let comments: string[] = []
</script>

{#if selected.some(i => i == true) && open}
<div transition:fly={{ duration: 200, y: 50 }} class="fixed inset-x-0 mx-auto bottom-4 max-w-md z-[51]">
  <Alert.Root>
    <FileOutput size="16" />
    <Alert.Title>Sending {selectedValues.map(i => i+1).join(', ')} back for review.</Alert.Title>
    <Alert.Description>
      <form class="mt-3" method="POST" action="?/review" use:enhance={() => {
        toast.loading('Reviewing...')
        isSaving = true
        return async ({ result }) => {
          if(result.type == 'success') {
            toast.success('Reviewed!')
            open = false
            selected = selected.map(i => false)
            invalidateAll()
          }
          else if (result.type == 'error') toast.error(result.error.message)
          isSaving = false
        }
      }}>
        <input type="hidden" name="id" value={focus} />
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
        <Button variant="outline" size="icon" on:click={() => {
          open = false
          selected = selected.map(i => false)
        }}>
          <Minimize2 size="16" />
        </Button>
      </div>
    </Alert.Description>
  </Alert.Root>
</div>
{/if}

<div class="container py-8">

  <div class="flex flex-col">
    <span class="text-2xl font-bold tracking-tight">Review #{data.id}</span>
    <span class="text-muted-foreground">You have been tasked to review {data.applications.length} applications for event "{event.name}"</span>    
    <div class="mt-4">
      <Dialog.Root>
        <Dialog.Trigger asChild let:builder>
          <Button builders={[builder]} size="sm">
            Submit
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
            <Dialog.Description>
              This action cannot be undone. Are you sure you want to submit the review?
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Button type="submit">Confirm submit</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
      <Button variant="outline">
        Download all applications
      </Button>
    </div>
  </div>

  <Separator class="my-6" />

  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head>
          Application ID
        </Table.Head>
        <Table.Head>
          Status
        </Table.Head>
        <Table.Head class="text-right">
          View
        </Table.Head>
        <Table.Head class="text-right">
          Actions
        </Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data.expand.applications as application, i}
        <Table.Row>
          <Table.Cell>
            {event.settings.responsePrefix}{application.application_id.toString().padStart(3, '0')}
          </Table.Cell>
          <Table.Cell>
            {#if data.review}
              {#if data.review[application.id]}
                <Badge variant="outline" class="text-green-600">Reviewed</Badge>
              {:else}
                <Badge variant="outline">Unevaluated</Badge>
              {/if}
            {:else}
              <Badge variant="outline">Unevaluated</Badge>
            {/if}
          </Table.Cell>
          
          <Table.Cell class="text-right">

            <AlertDialog.Root bind:open={open} onOpenChange={isOpen => focus = isOpen ? application.id : ''}>
              <AlertDialog.Trigger asChild let:builder>
                <Button variant="outline" builders={[builder]} size="icon" class="relative">
                  <Eye size="16" />
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content class="h-screen !max-w-xl overflow-auto pb-64">
                <AlertDialog.Header>
                  <AlertDialog.Title>
                    Application response
                  </AlertDialog.Title>
                  <AlertDialog.Description>
                    <!-- {application.expand.responder.username} / {application.expand.responder.email} -->
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

          </Table.Cell>

          <Table.Cell class="text-right">
            <Button variant="outline" size="icon" class={statuses[i] == 'approve' ? 'bg-green-300' : ''} on:click={() => {
              if(statuses[i] == 'approve') statuses[i] = ''
              else statuses[i] = 'approve'
            }}>
              <Check size="16" />
            </Button>
            
            <Dialog.Root>
              <Dialog.Trigger asChild let:builder>
                <Button variant="outline" size="icon" class={comments[i] ? 'bg-blue-300' : ''} builders={[builder]}>
                  <MessageCircle size="16" />
                </Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Add a comment for this application.</Dialog.Title>
                  <Dialog.Description>
                    
                  </Dialog.Description>
                  <Textarea bind:value={comments[i]} class="w-full mt-2" placeholder="Add a comment..." />
                </Dialog.Header>
              </Dialog.Content>
            </Dialog.Root>

            <Button variant="outline" size="icon" class={statuses[i] == 'decline' ? 'bg-red-300' : ''} on:click={() => {
              if(statuses[i] == 'decline') statuses[i] = ''
              else statuses[i] = 'decline'
            }}> 
              <X size="16"  />
            </Button>
          </Table.Cell>

        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>  

</div>