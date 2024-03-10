<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea"
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
        type: 'LongText',
        question: content.question,
        description: content.description,
        value: ''
      }
    }
  })

  $: if (value) {
    valid =
      (content.required ? value.value.length > 0 : true) &&
      (content.isMaxChar ? (value.value.length <= parseInt(content.maxChar)) : true)
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
    <Textarea
      disabled={disabled}
      class="mt-8 text-xl"
      placeholder="Type your answer here..."
      bind:value={value.value}
    />
    <div class="flex mt-1 gap-2 items-center">
      {#if content.isMaxChar}
      <span class="text-sm" 
        class:text-muted-foreground={value.value.length <= parseInt(content.maxChar)}
        class:text-destructive={value.value.length > parseInt(content.maxChar)}
      >
        {value.value.length}/{content.maxChar}
      </span>
      {/if}

      {#if content.required}
      <span class="text-sm" class:text-muted-foreground={value.value} class:text-destructive={!value.value}>Required</span>
      {:else}
      <span class="text-muted-foreground text-sm">Optional</span>
      {/if}
    </div>
  </div>
</div>
{/if}