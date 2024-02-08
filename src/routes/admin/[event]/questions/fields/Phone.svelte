<script lang="ts">
  import * as Card from "$lib/components/ui/card"
  import { Input } from "$lib/components/ui/input"
  import Editor from "$lib/components/Editor.svelte"
  import { Checkbox } from "$lib/components/ui/checkbox"
  import Label from "$lib/components/ui/label/label.svelte"
  
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
      <Input class="mt-8 text-xl" placeholder="0987654321" disabled />
    </Card.Content>
  </Card.Root>

  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <Checkbox bind:checked={value.required} />
      <Label>Required</Label>
    </div>
  </div>
</div>