<script lang="ts">
  import * as Card from "$lib/components/ui/card"
  import { Input } from "$lib/components/ui/input"
  import Editor from "$lib/components/Editor.svelte"
  import { Checkbox } from "$lib/components/ui/checkbox"
  import Label from "$lib/components/ui/label/label.svelte"
  import * as Table from "$lib/components/ui/table"
	import { onMount } from "svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { BarChart4, CaseLower, Edit, Plus, Sigma, TextCursorInput, Trash } from "lucide-svelte";
  import * as Popover from "$lib/components/ui/popover"

  export let value: Record<string, any>
  export let idx: number

  onMount(() => {
    value.th ??= ['Item', 'Price', 'Quantity', 'Total']
    value.tbody ??= [[{ type: 'text', value: 'Katsudon' }, { type: 'input', value: '150' }, { type: 'input', value: '3' }, { type: 'formula', value: '=A1*B1' }]]
  })

  let cellToRead = ''
  let rangeInput = ['', '']
  let rangeOutput = ['']
</script>

<div class="flex-1 flex flex-col gap-4">
  <Card.Root class="py-12">
    <Card.Content class="pb-0 px-16 flex flex-col justify-center h-full">
      <div class="relative">
        <span class="absolute text-xs -left-4 top-1">
          {idx + 1}.
        </span>
        <Editor bind:value={value.question} placeholder="Your question here" class="text-xl outline-none" />
      </div>
      <Editor bind:value={value.description} placeholder="Description (optional)" class="text-sm outline-none" />

      <div class="flex justify-end">
        <Button variant="ghost" size="sm" class="px-1 w-max flex items-center gap-1" on:click={() => {
          value.th = [...value.th, '']
          value.tbody = value.tbody.map(row => [...row, { type: 'input', value: '' }])
        }}>
          <Plus size="16"/>
          Add row
        </Button>
      </div>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head class="px-1">

            </Table.Head>
            {#each value.th || [] as th, idx}
            <Table.Head class="px-1">
              <div class="flex gap-1">
                <Button disabled={value.th?.length <= 1} variant="outline" size="icon" class="h-6 w-8" on:click={() => {
                  value.th.splice(idx, 1)
                  for (let row of value.tbody) {
                    row.splice(idx, 1)
                  }
                  value.th = value.th
                  value.tbody = value.tbody
                }}>
                  <span class="">
                    {idx+1}
                  </span>
                  <Trash size="12" />
                </Button>
                <Input bind:value={th} class="h-6" placeholder="Header item" />
              </div>
            </Table.Head>
            {/each}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each value.tbody || [[]] as row, idx}
          <Table.Row>
            <Table.Cell class="px-1">
              <Button disabled={value.tbody?.length <= 1} variant="outline" size="icon" class="h-6 w-6" on:click={() => {
                value.tbody.splice(idx, 1)
                value.tbody = value.tbody
              }}>
                <span class="">
                  {String.fromCharCode(65 + idx)}
                </span>
                <Trash size="12" />
              </Button>
            </Table.Cell>
            {#each row || [] as cell}
            <Table.Cell class="px-1">
              <div class="flex gap-1">
                <Button variant="outline" size="icon" class="h-6 w-8" on:click={() => {
                  if (cell.type == 'text') cell.type = 'input'
                  else if (cell.type == 'input') cell.type = 'formula'
                  else if (cell.type == 'formula') cell.type = 'range'
                  else cell.type = 'text'
                }}>
                  {#if cell.type == 'input'} <TextCursorInput size="12" />
                  {:else if cell.type == 'text'} <CaseLower size="12" />
                  {:else if cell.type == 'formula'} <Sigma size="12" />
                  {:else if cell.type == 'range'} <BarChart4 size="12" />
                  {/if}
                </Button>
                {#if cell.type == 'range'}
                <Popover.Root>
                  <Popover.Trigger asChild let:builder>
                    <Button builders={[builder]} class="h-6 w-full" variant="outline">
                      Set range
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content>
                    <Input placeholder="Cell to read" class="h-6 mb-4" bind:value={cellToRead} />
                    <div class="flex gap-2">
                      <div class="flex flex-col gap-1">
                        {#each rangeInput as input, idx}
                        <Input bind:value={input} class="h-6" placeholder="Input" />
                        {/each}
                        <Button variant="outline" class="h-6" on:click={() => {
                          rangeInput = [...rangeInput, '']
                          rangeOutput = [...rangeOutput, '']
                        }}>Add input</Button>
                      </div>
                      <div class="mt-3 flex flex-col gap-1">
                        {#each rangeOutput as output, idx}
                        <span>-></span>
                        {/each}
                      </div>
                      <div class="flex flex-col gap-1 mt-3">
                        {#each rangeOutput as output, idx}
                        <Input bind:value={rangeOutput[idx]} class="h-6" placeholder="Output" />
                        {/each}
                      </div>
                    </div>
                  </Popover.Content>
                </Popover.Root>
                {:else}
                <Input bind:value={cell.value} class="h-6" placeholder="Cell item" />
                {/if}
              </div>
            </Table.Cell>
            {/each}
          </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
      
      <div>
        <Button variant="ghost" size="sm" class="px-1 w-max flex items-center gap-1" on:click={() => {
          value.tbody = [...value.tbody, value.th.map(() => ({ type: 'input', value: '' }))]
        }}>
          <Plus size="16"/>
          Add row
        </Button>
      </div>

    </Card.Content>
  </Card.Root>

  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <Checkbox bind:checked={value.required} />
      <Label>Required</Label>
    </div>
    <div class="flex items-center gap-2">
      <Checkbox bind:checked={value.isAddRow} />
      <Label>Allow row adding</Label>
    </div>
  </div>
</div>