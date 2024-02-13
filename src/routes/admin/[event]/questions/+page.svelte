<script lang="ts">
  import Draglist from "$lib/components/Draglist.svelte"
  import * as Card from "$lib/components/ui/card"
  import { Button } from "$lib/components/ui/button"
  import { Plus, MoreVertical, Trash, Copy } from "lucide-svelte"
  import { Badge } from "$lib/components/ui/badge"
  import * as Popover from "$lib/components/ui/popover"
  import fieldTypes from "./fieldtypes"
  import { nanoid } from 'nanoid'
	import { onMount } from "svelte"
  import { enhance } from '$app/forms'
	import { toast } from "svelte-sonner"
  import { format } from 'timeago.js'

  export let data
  $: ({ questions, updated_questions } = data.event ?? {})
  
  type Item = { id: string, type: string; value: Record<string, any> }
  let items: Item[] = []
  let selected: number | null = null
  let updatedDate: string | null = null
  let updatedItems: Item[] = []

  onMount(() => {
    items = JSON.parse(JSON.stringify(questions)) ?? []
    updatedItems = JSON.parse(JSON.stringify(questions)) ?? []
    updatedDate = updated_questions ?? null
  })

</script>

<div class="relative mb-4">
  <form class="md:absolute -top-14 right-0" method="POST" action="" use:enhance={() => {
    toast.loading('Saving...')
    return async ({ result }) => {
      if(result.type == 'success') {
        updatedDate = result.data?.updated_questions ?? null
        updatedItems = result.data?.questions ?? []
        toast.success('Saved')
      }
      else if (result.type == 'error') toast.error(result.error.message)
    }
  }}>
    <input type="hidden" name="questions" value={JSON.stringify(items)} />
    <Button type="submit" class="w-full md:w-auto" disabled={JSON.stringify(items) == JSON.stringify(updatedItems)}>
      Save changes (saved {updatedDate ? format(updatedDate) : 'never'})
    </Button>
  </form>
</div>

<div class="flex gap-4 flex-col md:flex-row">
  <Card.Root class="h-full max-h-[60vh] min-w-64 overflow-x-hidden">
    <Card.Header class="py-3 px-4 sticky top-0 bg-background">
      <Card.Title class="flex items-center justify-between">
        <span>Content</span>
        <Popover.Root>
          <Popover.Trigger asChild let:builder>
            <Button builders={[builder]} size="icon" class="w-8 h-8">
              <Plus size="16" />
            </Button>
          </Popover.Trigger>
          <Popover.Content class="flex flex-col max-h-48 overflow-auto p-0">
            {#each Object.entries(fieldTypes) as [type, { label, icon }]}
            <Button variant="ghost" size="sm" class="py-2 flex items-center justify-start gap-2" on:click={() => {
              selected = null
              items = [...items, { id: nanoid(8), type: type, value: {} }]
            }}>
              <svelte:component this={icon} size="12" />
              <span class="text-xs">{label}</span>
            </Button>
            {/each}
          </Popover.Content>
        </Popover.Root>
      </Card.Title>
    </Card.Header>
    <Draglist items={items} let:item let:idx onDrop={data => {
      selected = null
      items = data
    }}>
      <div class="flex">
        <Button variant="ghost" class="flex gap-3 w-full justify-start" on:click={() => {
          selected = idx
        }}>
          <Badge class="flex items-center gap-2">
            <svelte:component this={fieldTypes[item.type].icon} size="12" />
            {idx + 1}
          </Badge>
          <span>{fieldTypes[item.type].label}</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Popover.Root>
            <Popover.Trigger asChild let:builder>
              <Button builders={[builder]} variant="ghost" size="icon">
                <MoreVertical size="16" />
              </Button>
            </Popover.Trigger>
            <Popover.Content class="w-max h-max p-0" side="right">
              <Button variant="ghost" size="icon" on:click={() => {
                selected = null
                items.splice(idx, 0, { ...JSON.parse(JSON.stringify(item)), id: nanoid(8) })
                items = items
              }}>
                <Copy size="16" />
              </Button>
              <Button variant="destructive" size="icon" on:click={() => {
                selected = null
                items.splice(idx, 1)
                items = items
              }}>
                <Trash size="16" />
              </Button>
            </Popover.Content>
          </Popover.Root>
        </Button>
      </div>
    </Draglist>
  </Card.Root>
  
  {#if selected != null}
    {#key selected}
    <svelte:component this={fieldTypes[items[selected].type].component} bind:value={items[selected].value} idx={selected} />
    {/key}
  {/if}
</div>