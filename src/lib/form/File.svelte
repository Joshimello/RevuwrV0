<script>
  import * as C from "carbon-components-svelte";
  export let details, value = []
  let error = []
</script>

<div class="grid grid-cols-4 items-top gap-x-8 gap-y-2">
  <span class="text-right pt-3">{details.title}</span>
  <div class="col-span-3">
    <C.FileUploaderDropContainer
      class="w-full"
      bind:files={value}
      accept={details.limitTypes ? details.limitTypes.map(i => '.'+i) : []}
      multiple
      labelText="Drop files here or click here to select"
      validateFiles={(files) => {
        if(details.limitCount && files.length > details.limitCount){
          error = files.slice(details.limitCount)
          return files.slice(0, details.limitCount)
        }
        return files
      }}
    />
  </div>
  <div class="col-span-3 col-start-2">
    {#if value.length == 0 && details.limitTypes}
    <span>Accepts {details.limitTypes.join(', ')}</span>
    {/if}
    {#each value as file, idx}
    <C.FileUploaderItem name={file.name} status="edit" on:delete={() => {
      value.splice(idx, 1)
      value = value
    }} />
    {/each}
    {#each error as file, idx}
    <C.FileUploaderItem name={file.name} status="edit" invalid errorSubject="Exceed file count limit" on:delete={() => {
      error = []
    }} />
    {/each}
  </div>
  {#if details.isDescription}
  <div class="col-span-3 col-start-2">{@html details.description}</div>
  {/if}
</div>