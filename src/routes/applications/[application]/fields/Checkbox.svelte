<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox"
  import Label from "$lib/components/ui/label/label.svelte"
  import { onMount } from "svelte"
  
  export let content: Record<string, any>
  export let idx: number
  export let id: string
  export let value: Record<string, any>
  export let disabled: boolean
  export let valid: boolean
  
  onMount(() => {
    if (value == null) {
      value   = {
        id: id,
        type: 'Checkbox',
        question: content.question,
        description: content.description,
        value: [...content.choices.map(choice => ({
          label: choice,
          value: false,
        })), {
          label: '',
          value: false,
        }]
      }
    }
  })

  $: isSelect = value?.value.some(i => i.value == true) || false
  
  $: if (value) {
    valid = content.required ? isSelect : true
  }

</script>

{#if value}
<div class="flex-1 flex flex-col gap-4">
  <div class="py-12 flex flex-col justify-center h-full">
    <div class="relative">
      <span class="absolute text-xs -left-4 top-1">
        {idx + 1}.
      </span>
      <span class="text-xl">
        {@html content.question}
      </span>
    </div>
    <span class="text-sm">
      {@html content.description}
    </span>
    <div class="pt-8">
      {#each content.choices as choice, idx}
      <div class="flex items-center gap-3">
        <Checkbox
          disabled={disabled}
          class="h-5 w-5 flex items-center justify-center"
          bind:checked={value.value[idx].value}
        />
        <Label class="flex-1">
          <span class="text-xl">{choice}</span>
        </Label>
      </div>
      {/each}
      {#if content.others}
      <div class="flex items-center gap-3">
        <Checkbox
          disabled={disabled}
          class="h-5 w-5 flex items-center justify-center"
          bind:checked={value.value[content.choices.length].value}
        />
        <Label class="flex-1">
          <input
            disabled={disabled}
            class="outline-none text-xl w-full"
            placeholder="Others (type here)"
            bind:value={value.value[content.choices.length].label}
          />
        </Label>
      </div>
      {/if}
    </div>
    <div class="flex mt-1 gap-2 items-center">
      {#if content.required}
      <span class="text-sm" class:text-muted-foreground={isSelect} class:text-destructive={!isSelect}>Required</span>
      {:else}
      <span class="text-muted-foreground text-sm">Optional</span>
      {/if}
    </div>
  </div>
</div>
{/if}