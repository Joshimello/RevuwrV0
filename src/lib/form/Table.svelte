<script>
  import { HyperFormula } from 'hyperformula';
  import * as C from "carbon-components-svelte";
  export let details, value, name

  let table = details.table.map(i => i.map(j => j.type != 'formula' ? j.value : ''))
  let tableValues = details.table.map(i => i.map(j => j.value))
  const hfInstance = HyperFormula.buildFromArray(tableValues, { licenseKey: 'gpl-v3' });

  const update = (i, j) => {
    hfInstance.setCellContents({ col: j, row: i, sheet: 0 }, table[i][j]);
    table = hfInstance.getAllSheetsValues().Sheet1
  }

  $: table, value = table

</script>

<input name={name} value={JSON.stringify(value)} class="hidden" />
<div class="grid grid-cols-3 gap-x-16">
  <div class="col-span-1 flex flex-col">
    <span class="text-2xl">{details.title}</span>    
    {#if details.isDescription}
    <div class="reset">{@html details.description}</div>
    {/if}
  </div>
  <div class="col-span-2 flex flex-col gap-2">
    <div class="grid gap-x-4 gap-y-2" style:grid-template-columns={'repeat('+ details.table[0].length +', 1fr)'}>
      {#each details.table as row, idx}
      {#each row as { type, value }, jdx}
      <div class="h-10 flex items-center">
        {#if type == 'text'}
        <span>{value}</span>
        {:else if type == 'input'}
        <C.TextInput bind:value={table[idx][jdx]} on:input={() => update(idx, jdx)} />
        {:else if type == 'formula'}
        <span>{table[idx][jdx]}</span>
        <C.Tooltip>{value}</C.Tooltip>
        {/if}
      </div>
      {/each}
      {/each}
    </div>
    {#if details.required}
    <span class="text-right">*Required</span>
    {/if}
  </div>
</div>