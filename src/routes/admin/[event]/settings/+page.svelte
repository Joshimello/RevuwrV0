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

  let items: Record<string, any> = {}
  let updatedItems: Record<string, any> = {}
  let updatedDate: string | null = null
  let isSaving: boolean = false

</script>

<div class="relative">
  <form class="md:absolute right-0" method="POST" action="" use:enhance={() => {
    toast.loading('Saving...')
    isSaving = true
    return async ({ result }) => {
      if(result.type == 'success') {
        toast.success('Saved')
      }
      else if (result.type == 'error') toast.error(result.error.message)
      isSaving = false
    }
  }}>
    <input type="hidden" name="settings" value={JSON.stringify(items)} />
    <Button type="submit" class="w-full md:w-auto" disabled={(JSON.stringify(items) == JSON.stringify(updatedItems)) || isSaving}>
      Save changes (saved {updatedDate ? format(updatedDate) : 'never'})
    </Button>
  </form>
</div>

<div class="lg:max-w-2xl">
  <div class="flex flex-col">
    <span class="text-lg font-medium">Public information</span>
    <span class="text-sm text-muted-foreground">Information that will be displayed to the public.</span>
  </div>

  <Separator class="my-6"/>

  <div class="space-y-8">
    <div class="flex flex-col w-full gap-2">
      <Label>Event title</Label>
      <Input type="text" placeholder="Enter a event title..." />
    </div>

    <div class="flex flex-col w-full gap-2">
      <Label>Event description</Label>
      <Textarea placeholder="Give the event a description..." />
    </div>

    <div class="flex flex-col w-full gap-2">
      <Label>Event target audience</Label>
      <Select.Root selected={{ value: "anyone", label: "Anyone" }}>
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
      <DateRangePicker/>
    </div>

    <div class="flex flex-col w-full gap-2">
      <Label>When start date...</Label>
      <Select.Root selected={{ value: true, label: 'Allow responses' }}>
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
      <Select.Root selected={{ value: true, label: 'Disable new responses' }}>
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
      <Input type="number" placeholder="Enter a number..." value={1} />
    </div>

    <div class="flex flex-col w-full gap-2">
      <Label>Response id prefix</Label>
      <Input type="text" placeholder="Enter a prefix..." />
      <span class="text-sm text-muted-foreground">Example: 001</span>
    </div>
  </div>

</div>