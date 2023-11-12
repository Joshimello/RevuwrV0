<script>
  import * as C from "carbon-components-svelte";
  export let details, value = [], name
  let typeError = [], countError = []
</script>

<div class="grid grid-cols-3 gap-x-16">
  <div class="col-span-1 flex flex-col">
    <span class="text-2xl">{details.title}</span>    
    {#if details.isDescription}
    <div class="reset">{@html details.description}</div>
    {/if}
  </div>
  <div class="col-span-2 flex flex-col gap-2">
    <C.FileUploaderDropContainer
      name={name}
      class="w-full"
      bind:files={value}
      accept={details.limitTypes ? details.limitTypes.map(i => '.'+i) : []}
      multiple
      labelText="Drop files here or click here to select"
      validateFiles={(files) => {
        if(details.limitCount && files.length > details.limitCount){
          countError = files.slice(details.limitCount)
          return files.slice(0, details.limitCount)
        }
        return files
      }}
    />
    {#if value.length == 0 && details.limitTypes}
    <span>Accepts {details.limitTypes.join(', ')}</span>
    {/if}
    {#if details.required}
    <span class="text-right">*Required</span>
    {/if}
    {#each value as file, idx}
    <C.FileUploaderItem name={file.name} status="edit" on:delete={() => {
      value.splice(idx, 1)
      value = value
    }} />
    {/each}
    {#each countError as file, idx}
    <C.FileUploaderItem name={file.name} status="edit" invalid errorSubject="Exceed file count limit" on:delete={() => {
      countError = []
    }} />
    {/each}
  </div>
</div>