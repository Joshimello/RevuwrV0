<script lang="ts">
  import { Input } from "$lib/components/ui/input"
  import { Label } from "$lib/components/ui/label"
  import { Textarea } from "$lib/components/ui/textarea"
  import * as Select from "$lib/components/ui/select"
  import DateRangePicker from "$lib/components/DateRangePicker.svelte"
  import { Separator } from "$lib/components/ui/separator"
  import { Button } from "$lib/components/ui/button"
  import { enhance } from '$app/forms'
	import { toast } from "svelte-sonner"
  import { format } from 'timeago.js'
  import { onMount } from "svelte"
  import * as Alert from "$lib/components/ui/alert"
  import { fly } from 'svelte/transition'
  import { Save } from "lucide-svelte"

  export let data
  $: ({ name, settings, updated_settings } = data.event ?? {})

  let items: Record<string, any> = {}
  let updatedItems: Record<string, any> = {}
  let updatedDate: string | null = null
  let isSaving: boolean = false

  onMount(() => {
    items = JSON.parse(JSON.stringify(settings)) ?? {}
    updatedItems = JSON.parse(JSON.stringify(settings)) ?? {}
    updatedDate = updated_settings ?? null
  })

</script>

{#if JSON.stringify(items) != JSON.stringify(updatedItems)}
<div transition:fly={{ duration: 200, y: 50 }} class="fixed inset-x-0 mx-auto bottom-4 max-w-md">
  <Alert.Root>
    <Save class="h-4 w-4"/>
    <Alert.Title>Unsaved changes in settings detected!</Alert.Title>
    <Alert.Description>
      Last saved {updatedDate ? format(updatedDate) : 'never'}.
      <form class="mt-3" method="POST" action="" use:enhance={() => {
        toast.loading('Saving...')
        isSaving = true
        return async ({ result }) => {
          if(result.type == 'success') {
            updatedDate = result.data?.updated_settings ?? null
            updatedItems = result.data?.settings ?? {}
            toast.success('Saved')
          }
          else if (result.type == 'error') toast.error(result.error.message)
          isSaving = false
        }
      }}>
        <input type="hidden" name="settings" value={JSON.stringify(items)} />
        <Button type="submit" class="w-full" disabled={(JSON.stringify(items) == JSON.stringify(updatedItems)) || isSaving}>
          Save changes
        </Button>
      </form>
    </Alert.Description>
  </Alert.Root>
</div>
{/if}

<div class="lg:max-w-2xl">
  <div class="flex flex-col">
    <span class="text-lg font-medium">Public information</span>
    <span class="text-sm text-muted-foreground">Information that will be displayed to the public.</span>
  </div>

  <Separator class="my-6"/>

  <div class="space-y-8">
    <div class="flex flex-col w-full gap-2">
      <Label>Event title</Label>
      <Input value={name} disabled type="text" placeholder="Enter a event title..."/>
      <!-- <Input bind:value={items.eventTitle} type="text" placeholder="Enter a event title..."/> -->
    </div>

    <div class="flex flex-col w-full gap-2">
      <Label>Event description</Label>
      <Textarea bind:value={items.eventDescription} placeholder="Give the event a description..." />
    </div>

    <div class="flex flex-col w-full gap-2">
      <Label>Event target audience</Label>
      <Select.Root selected={{ value: items.eventTarget, label: items.eventTarget }} onSelectedChange={value => {
        items.eventTarget = value?.value
      }}>
        <Select.Trigger>
          <Select.Value/>
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="anyone">Anyone</Select.Item>
          <Select.Item value="students">Students</Select.Item>
          <Select.Item value="teachers">Teachers</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  </div>
  
  <div class="flex flex-col mt-16">
    <span class="text-lg font-medium">Event visibility</span>
    <span class="text-sm text-muted-foreground">Timings and visibility settings for the event.</span>
  </div>

  <Separator class="my-6"/>

  <div class="space-y-8">
    <div class="flex flex-col w-full gap-2">
      <Label>Event start & end date</Label>
      <DateRangePicker bind:sValue={items.eventStartDate} bind:eValue={items.eventEndDate}/>
      {#if items.eventStartDate && items.eventEndDate}
      <span class="text-sm text-muted-foreground">
        {new Date(items.eventStartDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric'})} - {new Date(items.eventEndDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric'})}
      </span>
      {/if}
    </div>

    <div class="flex flex-col w-full gap-2">
      <Label>When start date...</Label>
      <Select.Root selected={{ value: items.allowResponsesWhenStart, label: items.allowResponsesWhenStart }} onSelectedChange={value => {
        items.allowResponsesWhenStart = value?.value
      }}>
        <Select.Trigger>
          <Select.Value/>
        </Select.Trigger>
        <Select.Content>
          <Select.Item value={true}>Allow responses</Select.Item>
          <Select.Item value={false}>Do nothing</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>

    <div class="flex flex-col w-full gap-2">
      <Label>When end date...</Label>
      <Select.Root selected={{ value: items.stopResponsesWhenEnd, label: items.stopResponsesWhenEnd }} onSelectedChange={value => {
        items.stopResponsesWhenEnd = value?.value
      }}>
        <Select.Trigger>
          <Select.Value/>
        </Select.Trigger>
        <Select.Content>
          <Select.Item value={true}>Disable new responses</Select.Item>
          <Select.Item value={false}>Do nothing</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  </div>

  <div class="flex flex-col mt-16">
    <span class="text-lg font-medium">Responses settings</span>
    <span class="text-sm text-muted-foreground">Settings related to user responses.</span>
  </div>

  <Separator class="my-6"/>

  <div class="space-y-8">
    <div class="flex flex-col w-full gap-2">
      <Label>Response limit per user</Label>
      <Input bind:value={items.responseLimit} type="number" placeholder="Enter a number..."/>
    </div>

    <div class="flex flex-col w-full gap-2">
      <Label>Response id prefix</Label>
      <Input bind:value={items.responsePrefix} type="text" placeholder="Enter a prefix..."/>
      <span class="text-sm text-muted-foreground">Example: {items.responsePrefix}001</span>
    </div>
  </div>

  <div class="h-64"></div>

</div>