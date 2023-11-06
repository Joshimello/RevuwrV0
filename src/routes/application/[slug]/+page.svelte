<script>
  import * as C from "carbon-components-svelte";

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

</script>

<C.Content>
  <h1>{name}</h1>
  <div>{@html description}</div>
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