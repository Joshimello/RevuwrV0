<script>
  import * as C from 'carbon-components-svelte';
  import Editor from '$lib/Editor.svelte'

  const fileTypes = [
    { id: "PNG", text: "PNG" },
    { id: "JPG", text: "JPG" },
    { id: "PDF", text: "PDF" }
  ]

  export let value

  if(!value.limitCount){
    value.limitCount = 1
  }

</script>

<div class="w-full">
  <C.Tile>
    <div class="flex flex-col pb-4 w-full">
      <C.TextInput light placeholder="Question title..." bind:value={value.title} />
      <div class="flex w-max items-start">
        <C.FileUploader
          disabled
          buttonLabel="Add files"
          status="complete"
        />
        <C.FileUploaderItem size="small" name="Sample_file.png" status="complete" />
      </div>

      {#if value?.isLimitType}
      <C.MultiSelect
        light
        size="sm"
        bind:selectedIds={value.limitTypes}
        label={value.limitTypes?.length ?
          value.limitTypes.join(', ') :
          'Select file types...'
        }
        items={fileTypes}
        sortItem={() => {}}
      />
      {/if}

      {#if value.isLimitCount}
      <C.NumberInput light size="sm" bind:value={value.limitCount} min={1} />
      {/if}

      {#if value?.isDescription}
      <Editor placeholder="Question description..." bind:value={value.description} />
      {/if}
    </div>
    <div class="flex gap-4 w-max items-end">
      <C.Checkbox labelText="Limit count" bind:checked={value.isLimitCount} />
      <C.Checkbox labelText="Limit type" bind:checked={value.isLimitType} />
      <C.Checkbox labelText="Description" bind:checked={value.isDescription} />
      <C.Checkbox labelText="Required" bind:checked={value.required} />
    </div>
  </C.Tile>
</div>