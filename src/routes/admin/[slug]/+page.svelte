<script>
  import * as C from 'carbon-components-svelte';

  export let data, form
  $: ({ name, description, start, end } = data)

  function formatTime(date) {
    if(!date) return ''
    const d = new Date(date)
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
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
    <C.TextArea value={description} labelText="Application description" placeholder="Application description..." name="description"/>
    <C.DatePicker valueFrom={start} valueTo={end} datePickerType="range" on:change>
      <C.DatePickerInput labelText="Start date" placeholder="mm/dd/yyyy" name="start" required/>
      <C.DatePickerInput labelText="End date" placeholder="mm/dd/yyyy" name="end" required/>
      <C.TimePicker value={formatTime(end)} labelText="End time" placeholder="hh:mm" name="endtime" />
    </C.DatePicker>
    <C.Button type="submit">Update</C.Button>
  </C.Form>

  <C.Form class="flex flex-col gap-4 mt-8" method="post" action="?/delete">
    <C.Button type="submit" kind="danger">Delete Application</C.Button>
  </C.Form>
</div>