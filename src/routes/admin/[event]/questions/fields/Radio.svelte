<script lang="ts">
  import * as Card from "$lib/components/ui/card"
  import { Input } from "$lib/components/ui/input"
  import Editor from "$lib/components/Editor.svelte"
  import { Button } from "$lib/components/ui/button"
  import { Checkbox } from "$lib/components/ui/checkbox"
  import * as RadioGroup from "$lib/components/ui/radio-group"
  import Label from "$lib/components/ui/label/label.svelte"
  import { Trash, Plus } from "lucide-svelte"
  import { onMount } from "svelte"
  
  export let value: Record<string, any>
  export let idx: number

  onMount(() => {
    if (!value.choices) {
      value.choices = ['']
    }
  })
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

      <RadioGroup.Root class="mt-8 gap-0">
        {#each value.choices || [] as choice, choiceIdx}  
        <div class="flex items-center gap-3">
          <RadioGroup.Item disabled class="w-5 h-5" value="uwu" />
          <Label class="flex-1">
            <input class="outline-none text-xl w-full" placeholder="Choice" bind:value={value.choices[choiceIdx]}/>
          </Label>
          <Button class="h-5 w-5" disabled={value.choices.length < 2} variant="ghost" size="icon" on:click={() => {
            value.choices.splice(choiceIdx, 1)
            value.choices = [...value.choices]
          }}>
            <Trash size="16" />
          </Button>
        </div>
        {/each}
        {#if value.others}
        <div class="flex items-center gap-3">
          <RadioGroup.Item disabled class="w-5 h-5" value="uwu" />
          <Label class="flex-1">
            <span class="text-xl w-full">Others</span>
          </Label>
        </div>
        {/if}
      </RadioGroup.Root>
      <Button variant="ghost" size="sm" class="px-1 w-max flex items-center gap-1" on:click={() => [
        value.choices = [...value.choices, '']
      ]}>
        <Plus size="16"/>
        Add choice
      </Button>
    </Card.Content>
  </Card.Root>

  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <Checkbox bind:checked={value.required} />
      <Label>Required</Label>
    </div>
    <div class="flex items-center gap-2">
      <Checkbox bind:checked={value.others} />
      <Label>Others option</Label>
    </div>
  </div>
</div>