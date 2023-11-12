<script>
  import * as C from "carbon-components-svelte";
  export let details, value, name
</script>

<div class="grid grid-cols-3 gap-x-16">
  <div class="col-span-1 flex flex-col">
    <span class="text-2xl">{details.title}</span>    
    {#if details.isDescription}
    <div class="reset">{@html details.description}</div>
    {/if}
  </div>
  <div class="col-span-2 flex flex-col gap-2">
    <div><C.TextArea bind:value name={name} /></div>
    {#if details.required}
    <span class="text-right">*Required</span>
    {/if}
  </div>
</div>