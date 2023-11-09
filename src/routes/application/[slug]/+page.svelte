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

  export let data
  $: ({ username, email, admin, record } = data)
  $: ({ name, description, questions } = record)

  onMount(() => {
    console.log(questions)
  })

  let response = {}
  $: response, console.log(JSON.stringify(response, null, 1))
  // $: response, console.log(response)

</script>

<C.Content>
  <h1>{name}</h1>
  <div>{@html description}</div>
  <C.Form action="" method="POST" class="flex flex-col gap-8 pt-16 max-w-xl">
    {#each questions as { type, details }, idx}
    <svelte:component this={questionTypes[type]} {details} bind:value={response[idx]} />
    {/each}
  </C.Form>
</C.Content>

<!-- <div class="flex p-8">
  <div class="flex flex-col gap-4 w-5/13">
    <h1>{name}</h1>
    <div>{@html description}</div>
  </div>
  <div class="flex flex-col gap-4 w-8/13">
    {#each questions as question}
    <svelte:component this={questionTypes[question.type]} details={question.details} />
    {/each}
  </div>
</div> -->