<script lang="ts">
  import { enhance } from "$app/forms"
  import { toast } from "svelte-sonner"
  import { File, Trash } from "lucide-svelte"
  import { Button } from "$lib/components/ui/button"
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
        type: 'File',
        question: content.question,
        description: content.description,
        value: []
      }
    }
  })

  let form: HTMLFormElement

  $: if (value) {
    valid =
      (content.required ? (value.value.length > 0) : true) &&
      (content.isMaxFiles ? (value.value.length <= parseInt(content.maxFiles)) : true)
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
    <form enctype="multipart/form-data" method="POST" action="?/file" bind:this={form} use:enhance={() => {
      toast.success('Uploading file...')
      return async ({ result }) => {
        if(result.type == 'success') {
          value.value = value.value.concat(result.data?.files || [])
          toast.success('File uploaded successfully')
        }
        else if (result.type == 'error') toast.error(result.error.message)
      }
    }}>
      <input
        disabled={disabled}
        name="file"
        on:change={() => {
          form.requestSubmit()
        }}
        type="file"
        multiple
        class="mt-8 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
    </form>

    {#if value.value && value.value.length > 0}
      {#each value.value as { file, url }, idx}
        <div class="flex mt-1 gap-2 items-center">
          <Button
            disabled={disabled}
            size="icon"
            variant="ghost"
            on:click={() => {
              value.value.splice(idx, 1)
              value.value = value.value
            }}
          >
            <Trash size="16" />
          </Button>
          <div class="h-12 w-12 border rounded-md flex flex-col items-center justify-center">
            <File size="16" />
          </div>
          <a href={url} target="_blank" class="self-start underline text-sm mt-1">
            {file}
          </a>
        </div>
      {/each}
    {/if}
    
    <div class="flex mt-1 gap-2 items-center">
      {#if content.isMaxFiles}
      <span class="text-sm {value.value.length > parseInt(content.maxFiles) ? 'text-destructive' : 'text-muted-foreground'}">
        File limit: {content.maxFiles}
      </span>
      <span class="text-sm text-muted-foreground">|</span>
      {/if}
      {#if content.required}
      <span class="text-sm" class:text-muted-foreground={value.value.length} class:text-destructive={!value.value.length}>Required</span>
      {:else}
      <span class="text-muted-foreground text-sm">Optional</span>
      {/if}
    </div>
  </div>
</div>
{/if}