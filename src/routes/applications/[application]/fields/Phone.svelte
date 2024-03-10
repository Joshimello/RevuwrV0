<script lang="ts">
  import { Input } from "$lib/components/ui/input"
  import { onMount } from "svelte"
  
  export let content: Record<string, any>
  export let idx: number
  export let id: string
  export let value: Record<string, any>
  export let disabled: boolean
  export let valid: boolean

  onMount(() => {
    if (value == null) {
      value = {
        id: id,
        type: 'Phone',
        question: content.question,
        description: content.description,
        value: ''
      }
    }
  })

  $: if (value) {
    valid =
      (content.required ? value.value.length > 0 : true) &&
      (value.value.length > 0 ? /^[0-9]{9,13}$/.test(value.value) : true)
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
    <Input 
      disabled={disabled}
      class="mt-8 text-xl" 
      placeholder="0987654321" 
      bind:value={value.value}
    />
    <div class="flex mt-1 gap-2 items-center">
      {#if !valid && value.value.length > 0}
      <span class="text-destructive text-sm">Invalid number</span>
      <span class="text-sm text-muted-foreground">|</span>
      {/if}
      {#if content.required}
      <span 
        class="text-sm" 
        class:text-muted-foreground={value.value} 
        class:text-destructive={!value.value}>
        Required
      </span>
      {:else}
      <span class="text-muted-foreground text-sm">Optional</span>
      {/if}
    </div>
  </div>
</div>
{/if}