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
  $: ({ user, question, answer } = data)
  $: ({ id, questions, idprefix } = question)
  $: ({ statusinfo, serial } = answer)

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
  <h1>Editing application {idprefix + serial.padStart(3, '0')}</h1>
  <h4>You are requested to review {statusinfo?.fields.map(i => questions[i].details.title).join(', ')}</h4>
  <form action="" method="POST" enctype="multipart/form-data" class="flex flex-col gap-8 pt-8">
    {#each questions as { type, details }, idx}
    {#if statusinfo?.fields.includes(idx)}
    <svelte:component this={questionTypes[type]} details={details} name={idx} />
    <hr>
    {/if}
    {/each}
    <C.Button class="w-full" type="submit">Submit</C.Button>
  </form>
</C.Content>