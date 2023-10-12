<script>
  export let data
  const { title, description, schema } = data
  console.log(schema)
</script>

<div class="h-full flex">
  <div class="h-full w-2/5 rounded-3xl custom-bg p-16 flex flex-col">
    <div class="flex gap-4 pb-12">
      <span>NTHU</span>
      <span>CTLD</span>
      <span class="underline underline-offset-4 ml-auto">ZH</span>
      <span class="underline underline-offset-4">LOGIN</span>
    </div>
    <span class="text-2xl font-600">
      {title}
    </span>
    <div>
      {@html description}
    </div>
  </div>
  <div class="h-full w-3/5 p-16 flex flex-col">
    {#each Object.entries(schema) as [uid, {type, value}]}
      {#if type == 'text'}
        <div class="">
          <input class=""/>
        </div>
      {:else if type == 'editor'}
        <div class="">
          <input class=""/>
        </div>
      {:else if type == 'file'}
        <div class="">
          <input class=""/>
        </div>
      {:else if type == 'radio'}
        <div class="">
          <input class=""/>
        </div>
      {:else if type == 'checkbox'}
        <div class="">
          <input class=""/>
        </div>
      {/if}
    {/each}
  </div>
</div>