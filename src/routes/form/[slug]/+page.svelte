<script lang="ts">
  import { goto } from '$app/navigation';
  
  import Text from '$lib/form/Text.svelte'
  import Editor from '$lib/form/Editor.svelte'
  import File from '$lib/form/File.svelte'
  import Radio from '$lib/form/Radio.svelte'
  import Checkbox from '$lib/form/Checkbox.svelte'

  const fields = {
    text: Text,
    editor: Editor,
    file: File,
    radio: Radio,
    checkbox: Checkbox
  }

  export let data
  const { title, description, schema } = data
  
  let input = {}
  // $: input, console.log(JSON.stringify(input, null, 2))

  const post = async () => {
    const response = await fetch(window.location.href, {
      method: 'POST',
      body: JSON.stringify(input)
    });

    const data = await response.json();
    const url = JSON.parse(data.data)[0];
    await goto(url);
  };
</script>

<div class="h-full flex">
  <div class="h-full w-2/5 rounded-3xl custom-bg p-16 flex flex-col">
    <div class="flex gap-4 pb-12">
      <span>NTHU</span>
      <span>CTLD</span>
      <span class="underline underline-offset-4 ml-auto">ZH</span>
      <span class="underline underline-offset-4">LOGIN</span>
    </div>
    <span class="text-2xl font-300 font-serif">
      {title}
    </span>
    <div>
      {@html description}
    </div>
  </div>

  <div class="h-full w-3/5 p-16 flex flex-col gap-12 overflow-auto scrollbar-thin scrollbar-thumb-c1 scrollbar-thumb-rounded">
    {#each Object.entries(schema) as [uid, {type, value}]}
      <svelte:component this={fields[type]} params={value} bind:value={input[uid]} />
    {/each}

    <button class="bg-black text-white p-4 rounded-xl my-16" on:click={post}>
      submit ->
    </button>
  </div>
</div>