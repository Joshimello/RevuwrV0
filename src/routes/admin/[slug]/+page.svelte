<script>
  import { onMount } from 'svelte'
  import * as C from 'carbon-components-svelte';
  import Editor from '$lib/Editor.svelte'

  export let data, form
  $: ({ name, description, start, end, idprefix } = data)

  function formatTime(date) {
    if(!date) return ''
    const d = new Date(date)
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  let newDescription = '', newIdprefix = ''
  onMount(() => {
    if(description){
      newDescription = description
      newIdprefix = idprefix || ''
    }
  })
</script>

<div class="flex flex-col gap-4">
  <h2>Editing {name} details</h2>

  {#if form?.success == false}
    <C.InlineNotification title="Error updating"/>
  {:else if form?.success == true}
    <C.InlineNotification kind="success" title="Successfully updated"/>
  {/if}

  <C.Form class="flex flex-col gap-4" method="post" action="?/update">
    
    <C.TextInput value={name} labelText="Application name" name="name" required/>
    
    <div class="border-b-1 border-solid border-gray-400 flex flex-col gap-2">
      <span class="text-xs text-gray-600">Application description</span>
      <Editor placeholder="Application description..." bind:value={newDescription} />
      <input class="hidden" bind:value={newDescription} name="description" />
    </div>
    
    <C.DatePicker valueFrom={start} valueTo={end} datePickerType="range" on:change>
      <C.DatePickerInput labelText="Start date" placeholder="mm/dd/yyyy" name="start"/>
      <C.DatePickerInput labelText="End date" placeholder="mm/dd/yyyy" name="end"/>
      <C.TimePicker value={formatTime(end)} labelText="End time" placeholder="hh:mm" name="endtime" />
    </C.DatePicker>

    <C.TextInput bind:value={newIdprefix} labelText="Serial ID" name="idprefix" helperText={'example: '+newIdprefix+'042'} />

    <C.Button type="submit">Update</C.Button>
  </C.Form>

  <C.Form class="flex flex-col gap-4 mt-8" method="post" action="?/delete">
    <C.Button type="submit" kind="danger">Delete Application</C.Button>
  </C.Form>
</div>