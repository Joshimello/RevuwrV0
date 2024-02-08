<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import * as Tooltip from "$lib/components/ui/tooltip"
  import { toast } from "svelte-sonner"
  import * as Table from "$lib/components/ui/table";
  import { onMount } from "svelte"
  import { goto } from "$app/navigation"
  import { Settings2, ListPlus, MessageSquareReply, Archive } from "lucide-svelte"
  
  export let data
  export let form

  $: ({ events } = data)

  const onSubmit = () => {
    toast.loading('Loading...')
  }

  onMount(async () => {
    if (form) {
      if (form.type == 'error') {
        toast.error(form.message)
      }
      if (form.type == 'success') {
        toast.success(form.message)
      }
      if (form.redirect) {
        goto(form.redirect)
      }
    }
  })
  
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Event</Table.Head>
      <Table.Head>Start</Table.Head>
      <Table.Head>End</Table.Head>
      <Table.Head class="text-end">

        <Dialog.Root>
          <Dialog.Trigger class={buttonVariants({ variant: "outline", size: "sm" })}>
            Create new event
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
            <form class="grid gap-4 py-4" method="POST" action="?/create" on:submit={onSubmit}>
              <div class="flex flex-col gap-4">
                <Input name="name" placeholder="Event name" required />
                <Button type="submit">Create</Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Root>

      </Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each events as event, i (i)}
      <Table.Row>
        <Table.Cell class="font-medium">{event.name}</Table.Cell>
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