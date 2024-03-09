<script lang="ts">
  import { Input } from "$lib/components/ui/input"
  import { onMount } from "svelte"
  import * as Table from "$lib/components/ui/table"
	import Button from "$lib/components/ui/button/button.svelte"
  import { page } from "$app/stores"
  import { Trash } from "lucide-svelte"
  import * as Tooltip from "$lib/components/ui/tooltip"
  import { HyperFormula, type CellValue, DetailedCellError } from 'hyperformula';

  export let content: Record<string, any>
  export let idx: number
  export let id: string
  export let value: Record<string, any>
  export let disabled: boolean

  let hfInstance: HyperFormula
  let displayValues: CellValue[][]

  onMount(() => {
    if (value == null) {
      value = {
        id: id,
        type: 'Table',
        question: content.question,
        description: content.description,
        value: {
          th: content.th,
          tbody: content.tbody
        }
      }
    }
  })

  $: if (value) {
    const tableValues = value.value.tbody.map(row => row.map(cell => cell.value))
    hfInstance = HyperFormula.buildFromArray(tableValues, { licenseKey: 'gpl-v3' })
    displayValues = hfInstance.getSheetValues(0)
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

    <Table.Root class="mt-8 min-w-[32rem]">
      <Table.Header>
        <Table.Row>
          {#each content.th as th}
          <Table.Head class="px-1 sm:px-4">{th}</Table.Head>
          {/each}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each content.tbody as row, idx}
        <Table.Row>
          {#each row as cell, jdx}
            {#if cell.type == 'text'}
              <Table.Cell class="px-1 py-2 sm:p-4">{cell.value}</Table.Cell>
            {:else if cell.type == 'input'}
              <Table.Cell class="px-1 py-2 sm:p-4">
                <Input disabled={disabled} bind:value={value.value.tbody[idx][jdx].value} on:input={e => {
                  hfInstance.setCellContents({ col: jdx, row: idx, sheet: 0 }, e.target?.value ?? 0)
                  displayValues = hfInstance.getSheetValues(0)
                }} />
              </Table.Cell>
            {:else if cell.type == 'formula'}
              <Table.Cell class="px-1 py-2 sm:p-4">
                <Tooltip.Root>
                  <Tooltip.Trigger class="underline">
                    {#if typeof(displayValues[idx][jdx]) == 'object'}
                      {displayValues[idx][jdx].value}
                    {:else}
                      {displayValues[idx][jdx]}
                    {/if}
                  </Tooltip.Trigger>
                  <Tooltip.Content>{cell.value}</Tooltip.Content>
                </Tooltip.Root>
              </Table.Cell>
            {/if}
          {/each}
        </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  
    <div class="flex mt-1 gap-2 items-center">
      {#if content.required}
      <span class="text-sm" class:text-muted-foreground={value.value} class:text-destructive={!value.value}>Required</span>
      {:else}
      <span class="text-muted-foreground text-sm">Optional</span>
      {/if}
    </div>
  </div>
</div>
{/if}