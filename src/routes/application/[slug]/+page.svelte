<script>
  import * as C from "carbon-components-svelte";
  import { onMount } from 'svelte'

  export let data
  $: ({ username, email, admin, record } = data)
  $: ({ name, description, questions } = record)

  onMount(() => {
    console.log(questions)
  })

  const response = {}

</script>

<C.Content>
  <h1>{name}</h1>
  <div>{@html description}</div>
  <C.Form action="" method="POST" class="flex flex-col gap-8 pt-16 max-w-xl">
    {#each questions as { type, details }, idx}
      {#if type == 'ShortText'}
      <div class="grid grid-cols-4 gap-x-8 gap-y-2">
        <span class="col-span-1 text-right pt-3">{details.title}</span>
        <div class="col-span-3"><C.TextInput bind:value={response[idx]} /></div>
        {#if details.isDescription}
        <div class="col-span-3 col-start-2">{@html details.description}</div>
        {/if}
      </div>
      {:else if type == 'LongText'}
      <div class="grid grid-cols-4 items-top gap-x-8 gap-y-2">
        <span class="text-right pt-3">{details.title}</span>
        <div class="col-span-3"><C.TextArea bind:value={response[idx]} /></div>
        {#if details.isDescription}
        <div class="col-span-3 col-start-2">{@html details.description}</div>
        {/if}
      </div>
      {:else if type == 'Radio'}
      <div class="grid grid-cols-4 items-top gap-x-8 gap-y-2">
        <span class="text-right pt-3">{details.title}</span>
        <div class="col-span-3">
          <C.TileGroup bind:selected={response[idx]}>
            {#each details.selections as sel}
            <C.RadioTile value={sel}>{sel}</C.RadioTile>
            {/each}
          </C.TileGroup>
        </div>
        {#if details.isDescription}
        <div class="col-span-3 col-start-2">{@html details.description}</div>
        {/if}
      </div>
      {:else if type == 'Checkbox'}
      <div class="grid grid-cols-4 items-top gap-x-8 gap-y-2">
        <span class="text-right pt-3">{details.title}</span>
        <div class="col-span-3">
          <div>
            {#each details.selections as sel}
            <C.SelectableTile>{sel}</C.SelectableTile>
            {/each}
          </div>
        </div>
        {#if details.isDescription}
        <div class="col-span-3 col-start-2">{@html details.description}</div>
        {/if}
      </div>
      {/if}
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