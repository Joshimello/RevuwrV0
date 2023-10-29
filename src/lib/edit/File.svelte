<script>
  import * as C from 'carbon-components-svelte';
  import Editor from '$lib/Editor.svelte'

  const fileTypes = [
    { id: 0, text: "PNG" },
    { id: 1, text: "JPG" },
    { id: 2, text: "PDF" }
  ]

  let limitTypes = []
  $:{ value.limitTypes = limitTypes.map(i => fileTypes[i].text) }

  export let value
  value.limitCount = 1
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
        bind:selectedIds={limitTypes}
        label={limitTypes.length ?
          limitTypes.map(i => fileTypes[i].text).join(', ') :
          'Select file types...'
        }
        items={[
          { id: "0", text: "PNG" },
          { id: "1", text: "JPG" },
          { id: "2", text: "PDF" }
        ]}
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