<script lang="ts">
  import * as Card from "$lib/components/ui/card"
  import { Input } from "$lib/components/ui/input"
  import Editor from "$lib/components/Editor.svelte"
  import { Checkbox } from "$lib/components/ui/checkbox"
  import Label from "$lib/components/ui/label/label.svelte"
  import * as Select from "$lib/components/ui/select"
  
  export let value: Record<string, any>
  export let idx: number
</script>

<div class="flex-1 flex flex-col gap-4">
  <Card.Root class="py-12">
    <Card.Content class="pb-0 px-16 flex flex-col justify-center h-full">
      <div class="relative">
        <span class="absolute text-xs -left-4 top-1">
          {idx + 1}.
        </span>
        <Editor bind:value={value.question} placeholder="Your question here" class="text-xl outline-none" />
      </div>
      <Editor bind:value={value.description} placeholder="Description (optional)" class="text-sm outline-none" />
      <Input type="file" class="mt-8 text-xl" disabled />
    </Card.Content>
  </Card.Root>

  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <Checkbox bind:checked={value.required} />
      <Label>Required</Label>
    </div>
    <div class="flex items-center gap-2">
      <Checkbox bind:checked={value.isMaxFiles} />
      <Label>Max files</Label>
      {#if value.isMaxFiles}
        <Input placeholder="0-99999" type="number" class="max-w-32 ml-4 h-4 p-1" bind:value={value.maxFiles} />
      {/if}
    </div>
    <div class="flex items-center gap-2">
      <Checkbox bind:checked={value.isSpecificType} />
      <Label>Specific file types</Label>
        {#if value.isSpecificType}
        <Select.Root bind:selected={value.specificType}>
          <Select.Trigger class="max-w-36 ml-4 h-4 p-1">
            <Select.Value placeholder="Select type" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="pdf">PDF</Select.Item>
            <Select.Item value="image">Image</Select.Item>
            <Select.Item value="audio">Audio</Select.Item>
            <Select.Item value="video">Video</Select.Item>
            <Select.Item value="document">Document</Select.Item>
            <Select.Item value="spreadsheet">Spreadsheet</Select.Item>
            <Select.Item value="presentation">Presentation</Select.Item>
          </Select.Content>
        </Select.Root>
        {/if}
    </div>
  </div>
</div>