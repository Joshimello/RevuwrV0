<script lang="ts">
  import * as Card from "$lib/components/ui/card"
  import { Input } from "$lib/components/ui/input"
  import Editor from "$lib/components/Editor.svelte"
  import { Checkbox } from "$lib/components/ui/checkbox"
  import Label from "$lib/components/ui/label/label.svelte"
  
  export let content: Record<string, any>
  export let idx: number
  export let value: string = ''

</script>

<div class="flex-1 flex flex-col gap-4">
  <div class="py-12 px-16 flex flex-col justify-center h-full">
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
    <Input class="mt-8 text-xl" placeholder="Type your answer here..." bind:value={value} />
    <div class="flex mt-1 gap-2 items-center">
      {#if content.isMaxChar}
      <span class="text-sm" 
        class:text-muted-foreground={value.length <= parseInt(content.maxChar)}
        class:text-destructive={value.length > parseInt(content.maxChar)}
      >
        {value.length}/{content.maxChar}
      </span>
      {/if}

      {#if content.required}
      <span class="text-sm" class:text-muted-foreground={value} class:text-destructive={!value}>Required</span>
      {:else}
      <span class="text-muted-foreground text-sm">Optional</span>
      {/if}
    </div>
  </div>
</div>