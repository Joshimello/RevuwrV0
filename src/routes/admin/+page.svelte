<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import * as Tooltip from "$lib/components/ui/tooltip"
  import { toast } from "svelte-sonner"
  import * as Table from "$lib/components/ui/table";
  import { Settings2, ListPlus, MessageSquareReply, Archive, Plus, ArrowDownNarrowWide, Filter, PenLine } from "lucide-svelte"
  import { enhance } from '$app/forms'
  import { invalidate, goto } from '$app/navigation'
  import { Separator } from "$lib/components/ui/separator"
  import * as Select from "$lib/components/ui/select"
  import { format } from "timeago.js"

  export let data
  $: ({ events } = data)

  let open = false
  let isCreating: boolean = false
  
</script>

<div class="flex flex-col">
  <span class="text-2xl font-bold tracking-tight">Admin dashboard</span>
  <span class="text-muted-foreground">Manage all your events here.</span>    
</div>

<Separator class="my-6" />

<div class="mt-6 mb-4 flex w-full gap-2">
  <Dialog.Root bind:open={open}>
    <Dialog.Trigger class={buttonVariants({ variant: "default" })}>
      <span class="flex items-center gap-2">
        <Plus size="16" />
        Create new event
      </span>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>
          Create new event
        </Dialog.Title>
        <Dialog.Description>
          You will be redirect to the new event page.
        </Dialog.Description>
      </Dialog.Header>
      <form class="grid gap-4 py-4" method="POST" action="?/create" use:enhance={() => {
        toast.loading('Creating...')
        isCreating = true
        return async ({ result }) => {
          if(result.type == 'success') {
            invalidate('app:events')
            toast.success('Created')
            open = false
          }
          else if (result.type == 'error') toast.error(result.error.message)
          isCreating = false
        }
      }}>
        <div class="flex flex-col gap-4">
          <Input name="name" placeholder="Event name" required />
          <Button type="submit" disabled={isCreating}>Create</Button>
        </div>
      </form>
    </Dialog.Content>
  </Dialog.Root>

  <Select.Root>
    <Select.Trigger class="w-32 ml-auto">
      <div class="flex items-center gap-2">
        <Filter size="16" />
        <Select.Value placeholder="Filter" />
      </div>
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="light">Light</Select.Item>
      <Select.Item value="dark">Dark</Select.Item>
      <Select.Item value="system">System</Select.Item>
    </Select.Content>
  </Select.Root>

  <Select.Root>
    <Select.Trigger class="w-32">
      <div class="flex items-center gap-2">
        <ArrowDownNarrowWide size="16" />
        <Select.Value placeholder="Sort" />
      </div>
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="light">Light</Select.Item>
      <Select.Item value="dark">Dark</Select.Item>
      <Select.Item value="system">System</Select.Item>
    </Select.Content>
  </Select.Root>
</div>

<div class="rounded-md border">
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Event</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head>Responses</Table.Head>
      <Table.Head class="text-end"></Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each events as event, i (i)}
      <Table.Row>
        <Table.Cell>
          <div class="flex flex-col">
            <span class="font-bold">{event.name}</span>
            <span class="flex items-center gap-1 text-sm text-muted-foreground">
              <PenLine size="14"/>
              {format(event.updated)}
            </span>
          </div>
        </Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell class="flex gap-2 justify-end">

          <Tooltip.Root>
            <Tooltip.Trigger asChild let:builder>
              <Button builders={[builder]} class="text-sm" variant="outline" size="icon" href={'/admin/' + event.id}>
                <Settings2 size="16" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>Change event settings</p>
            </Tooltip.Content>
          </Tooltip.Root>
          
          <Tooltip.Root>
            <Tooltip.Trigger asChild let:builder>
              <Button builders={[builder]} class="text-sm" variant="outline" size="icon" href={'/admin/' + event.id + '/questions'}>
                <ListPlus size="16" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>Edit event questions</p>
            </Tooltip.Content>
          </Tooltip.Root>
          
          <Tooltip.Root>
            <Tooltip.Trigger asChild let:builder>
              <Button builders={[builder]} class="text-sm" variant="outline" size="icon" href={'/admin/' + event.id + '/responses'}>
                <MessageSquareReply size="16" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>View responses</p>
            </Tooltip.Content>
          </Tooltip.Root>

        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
</div>