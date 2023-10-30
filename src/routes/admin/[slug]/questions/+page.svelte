<script>
  import * as C from 'carbon-components-svelte';
  import ChevronUp from "carbon-icons-svelte/lib/ChevronUp.svelte";
  import ChevronDown from "carbon-icons-svelte/lib/ChevronDown.svelte";
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";

  import TextShortParagraph from "carbon-icons-svelte/lib/TextShortParagraph.svelte";
  import TextLongParagraph from "carbon-icons-svelte/lib/TextLongParagraph.svelte";
  import RadioButtonChecked from "carbon-icons-svelte/lib/RadioButtonChecked.svelte";
  import CheckboxChecked from "carbon-icons-svelte/lib/CheckboxChecked.svelte";
  import Document from "carbon-icons-svelte/lib/Document.svelte";
  import TableSplit from "carbon-icons-svelte/lib/TableSplit.svelte";

  import ShortText from '$lib/edit/ShortText.svelte'
  import LongText from '$lib/edit/LongText.svelte'
  import Radio from '$lib/edit/Radio.svelte'
  import Checkbox from '$lib/edit/Checkbox.svelte'
  import File from '$lib/edit/File.svelte'
  import Table from '$lib/edit/Table.svelte'
  
  const questionTypes = {
    'ShortText': { comp: ShortText, icon: TextShortParagraph },
    'LongText': { comp: LongText, icon: TextLongParagraph },
    'Radio': { comp: Radio, icon: RadioButtonChecked },
    'Checkbox': { comp: Checkbox, icon: CheckboxChecked },
    'File': { comp: File, icon: Document },
    'Table': { comp: Table, icon: TableSplit },
  }

  export let data, form
  $: ({ name, description, start, end, schema } = data)

  let newSchema = schema || []
  $: newSchema, console.log(JSON.stringify(newSchema, null, 2))

</script>

<div class="flex flex-col gap-8">
  <h2>Editing {name} questions</h2>

  {#if form?.success == false}
    <C.InlineNotification title="Error updating"/>
  {:else if form?.success == true}
    <C.InlineNotification kind="success" title="Successfully updated"/>
  {/if}

  {#each newSchema as { type }, idx}
  <div class="flex w-full gap-2">
    <div class="flex flex-col">
      <C.Button kind="ghost" iconDescription="Move up" icon={ChevronUp} tooltipPosition="right" disabled={idx == 0} on:click={() => {
        [newSchema[idx], newSchema[idx-1]] = [newSchema[idx-1], newSchema[idx]];
      }}/> 
      <C.Button kind="danger-ghost" iconDescription="Delete" icon={TrashCan} tooltipPosition="right" on:click={() => {
        newSchema.splice(idx, 1)
        newSchema = [...newSchema]
      }}/>
      <C.Button kind="ghost" iconDescription="Move down" icon={ChevronDown} tooltipPosition="right" disabled={idx == newSchema.length-1} on:click={() => {
        [newSchema[idx], newSchema[idx+1]] = [newSchema[idx+1], newSchema[idx]];
      }}/>
    </div>
    <svelte:component this={questionTypes[type].comp} bind:value={newSchema[idx].details}/>
  </div>
  {/each}
</div>

<div class="pt-16 pb-4 flex gap-1 w-full justify-left">
  {#each Object.entries(questionTypes) as [type, { comp, icon }]}
  <C.Button kind="tertiary" icon={icon} iconDescription={'Add ' + type} on:click={() => {
    newSchema = [...newSchema, { type: type, details: {} }]
  }}/>
  {/each}
</div>

<C.Form class="flex flex-col" method="post" action="">
  <input class="hidden" name="schema" bind:value={newSchema} />
  <C.Button type="submit">Update</C.Button>
</C.Form>