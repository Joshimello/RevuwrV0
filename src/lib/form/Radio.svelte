<script lang="ts">
  export let params, value:string = ''
  const { title, subtitle, selections } = params

  const defaultValues = Object.assign(...selections.map(i => ({ [i]: false })));
  let values = defaultValues

  const select = (selection: string) => {
    if(values[selection] == true){
      values[selection] = false
      value = ''
    }
    else {
      values = {...defaultValues}
      values[selection] = true
      value = selection
    }
  }
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col">
    <span class="text-xl font-500">
      {title}
    </span>
    <span class="font-300">
      {subtitle}
    </span>
  </div>

  <div class="grid grid-cols-2 gap-4">
    {#each Object.entries(values) as [selection, selected]}
      <button 
        class="bg-c3 p-4 rounded-xl outline-2 outline-slate-500 border-2"
        class:outline={selected}
        on:click={() => select(selection)}
      >
        {selection}
      </button>
    {/each}
  </div>
</div>