<script>
  import { onMount } from 'svelte'
  import * as C from 'carbon-components-svelte';
  import Editor from '$lib/Editor.svelte'

  export let data, form
  $: ({ name, description, start, end, idprefix, replyto, mailas } = data)

  let newDescription = '', newIdprefix = ''
  onMount(() => {
    if(description){
      newDescription = description
      newIdprefix = idprefix || ''
    }
  })

</script>

<div class="flex flex-col gap-4">

  {#if form?.success == false}
    <C.InlineNotification title="Error updating"/>
  {:else if form?.success == true}
    <C.InlineNotification kind="success" title="Successfully updated"/>
  {/if}

  <C.Form class="flex flex-col gap-4" method="post" action="?/update">

    <h3>Application Settings</h3>

    <C.TextInput value={name} labelText="Application name" name="name" required/>
    
    <div class="border-b-1 border-solid border-gray-400 flex flex-col gap-2">
      <span class="text-xs text-gray-600">Application description</span>
      <Editor placeholder="Application description..." bind:value={newDescription} />
      <input class="hidden" bind:value={newDescription} name="description" />
    </div>

    <C.DatePicker datePickerType="single" value={start}>
      <C.DatePickerInput labelText="Start date" placeholder="mm/dd/yyyy" name="start" />
    </C.DatePicker>

    <C.DatePicker datePickerType="single" value={end}>
      <C.DatePickerInput labelText="End date" placeholder="mm/dd/yyyy" name="end" />
    </C.DatePicker>

    <h3 class="mt-16">Responses Settings</h3>

    <C.TextInput bind:value={newIdprefix} labelText="Serial ID" name="idprefix" helperText={'example: '+newIdprefix+'042'} />

    <h3 class="mt-16">Email Settings</h3>

    <C.TextInput value={mailas} type="text" placeholder="Joshua <admin@example.com>" labelText="Send emails as" name="mailas"/>
    <C.TextInput value={replyto} type="email" placeholder="admin@example.com" labelText="Default reply email" name="replyto"/>

    <div class="fixed bottom-8 right-8 flex gap-4 bg-white">
      <C.Button type="submit">Update settings</C.Button>
    </div>
  </C.Form>

  <div class="flex flex-col gap-4 mt-24">
    <h3 class="text-red-600">Danger Area Settings</h3>

    <C.Form class="flex flex-col gap-4" method="post" action="?/delete">
      <C.Button type="submit" kind="danger">Delete Application</C.Button>
    </C.Form>
  </div>
</div>