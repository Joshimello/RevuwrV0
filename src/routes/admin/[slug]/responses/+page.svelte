<script>
  import { onMount } from 'svelte'
  import * as C from 'carbon-components-svelte';
  import { format } from 'timeago.js'

  export let data, form
  $: ({ id, name, questions, idcount, idprefix, records } = data)
</script>

<div class="flex flex-col gap-8">
  <h2>Viewing {name} responses</h2>

  <div class="w-full flex flex-col">
    <div class="flex gap-4">
      <div><C.Checkbox labelText="Select all" hideLabel /></div>
      <div class="w-full grid grid-cols-5 gap-4 items-center">
        <span class="font-bold">Serial ID</span>
        <span class="font-bold">Username</span>
        <span class="font-bold">Time</span>
        <span class="font-bold">Status</span>
      </div>
    </div>
    {#each records as { id: rid, serial, created, expand: { responder, status } }}
    <hr>
    <div class="w-full flex gap-4 py-4">
      <div><C.Checkbox labelText="Select one" hideLabel /></div>
      <div class="w-full grid grid-cols-5 gap-4 items-center">
        <span>{idprefix + serial.padStart(3, '0')}</span>
        <span>{responder[0].username}</span>
        <span>{format(created)}</span>
        <span class="font-bold" style:color={status[0].color}>{status[0].title}</span>
        <C.Link inline href={'/admin/' + id + '/responses/' + rid}>
          Details
        </C.Link>
      </div>    
    </div>
    {/each}
  </div>

</div>