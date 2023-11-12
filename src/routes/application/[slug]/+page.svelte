<script>
  import * as C from "carbon-components-svelte";
  import { onMount } from 'svelte'

  import ShortText from '$lib/form/ShortText.svelte'
  import LongText from '$lib/form/LongText.svelte'
  import Radio from '$lib/form/Radio.svelte'
  import Checkbox from '$lib/form/Checkbox.svelte'
  import File from '$lib/form/File.svelte'
  import Table from '$lib/form/Table.svelte'

  const questionTypes = {
    'ShortText': ShortText,
    'LongText': LongText,
    'Radio': Radio,
    'Checkbox': Checkbox,
    'File': File,
    'Table': Table,
  }

  export let data, form
  $: ({ username, email, admin, record } = data)
  $: ({ name, description, questions } = record)

  let response = {}
  // $: response, console.log(JSON.stringify(response, null, 1))
  // $: response, console.log(response)

</script>

<C.Content>
  {#if form}
  <C.InlineNotification title={form.status}>
    <svelte:fragment slot="actions">
      <C.NotificationActionButton href="mailto:joshualeanjw@gmail.com" target="_blank">
        Contact admin
      </C.NotificationActionButton>
    </svelte:fragment>
  </C.InlineNotification>
  {/if}
  <h1>{name}</h1>
  <div>{@html description}</div>
  <form action="" method="POST" enctype="multipart/form-data" class="flex flex-col gap-8 pt-16">
    {#each questions as { type, details }, idx}
    <svelte:component this={questionTypes[type]} {details} bind:value={response[idx]} name={idx} />
    <hr>
    {/each}
    <C.Button class="w-full" type="submit">Submit</C.Button>
  </form>
</C.Content>