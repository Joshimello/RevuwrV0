<script>
  import * as C from 'carbon-components-svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte'
  import User from "carbon-icons-svelte/lib/User.svelte"
  import Email from "carbon-icons-svelte/lib/Email.svelte"
  import DocumentMultiple_01 from "carbon-icons-svelte/lib/DocumentMultiple_01.svelte"


  const imgUrl = 'https://ctld.pockethost.io/api/files/'
  
  export let data
  $: ({ questions, response, records, idprefix, id } = data)

  let search = ''
  
  let selected
  onMount(() => {
    selected = questions.map(_ => false)
  })

  $: selectedIdx = selected?.reduce((a, v, i) => v ? [...a, i] : a, [])
</script>

<div class="w-full flex">
  <C.Button size="small" href={'/admin/' + id + '/responses/'}>Return to list</C.Button>
  <div class="w-full">
    <C.ComboBox
      placeholder="Select response"
      items={records}
      shouldFilterItem={(item, value) => {
        if(!value) return true
        search = value
        let searchVal = idprefix + item.serial.padStart(3, '0') + item[0]
        return searchVal.toLowerCase().includes(value.toLowerCase())
      }}
      itemToString={(item) => {
        return search
      }}
      on:select={(e) => {
        goto('/admin/' + id + '/responses/' + e.detail.selectedId)
      }}
      let:item
      let:index
    >
      <div class="flex flex-col">
        <span class="font-bold" style:color={item.expand.status[0].color}>
          {item.expand.status[0].title}
        </span>
        <span class="font-bold">{item[0]}</span>
        <span>{idprefix + item.serial.padStart(3, '0')}</span>
      </div>
    </C.ComboBox>
  </div>
</div>

<div class="flex flex-col gap-4 pt-8 pb-32">
  <div class="flex gap-4">
    <span class="font-bold flex items-center gap-2">
      <DocumentMultiple_01/>
      {idprefix + response.serial.padStart(3, '0')}
    </span>
    <span class="font-bold" style:color={response.expand.status[0].color}>
      {response.expand.status[0].title}
    </span>
  </div>
  <hr>
  <div class="flex gap-4">
    <span class="flex items-center gap-2">
      <User/>
      {response.expand.responder[0].name} ({response.expand.responder[0].username})
      <Email/>
      {response.expand.responder[0].email}
    </span>
  </div>
  {#each questions as { type, details: { title } }, idx}
  <hr>
  <div class="flex w-full items-center gap-2">
    {#if selected}
    <div><C.Checkbox bind:checked={selected[idx]} /></div>
    {/if}
    <div class="w-full grid grid-cols-4 gap-4 items-center">
      <span>{idx+1}. {title}</span>
      <div class="col-span-3">
        {#if type == 'Table'}
        <div class="grid gap-2" style:grid-template-columns={'repeat('+response[idx][0].length+', minmax(0, 1fr))'}>
          {#each response[idx] as row, i}
          {#each response[idx][i] as cell, j}
          <span>{cell}</span>
          {/each}
          {/each}
        </div>
        {:else if type == 'File'}
        <div class="flex flex-col gap-2">
          {#each response[idx] as file}
            {#if ['jpg', 'jpeg', 'png', 'gif'].includes(file.split('.').pop().toLowerCase())}
            <a href={imgUrl+id+'/'+response.id+'/'+file} target="_blank">
              <img class="h-30" src={imgUrl+id+'/'+response.id+'/'+file} alt="" />
            </a>
            {:else}
            <a href={imgUrl+id+'/'+response.id+'/'+file} download={file}>{file}</a>
            {/if}
          {/each}
        </div>
        {:else}
        {response[idx]}
        {/if}
      </div>
    </div>
  </div>
  {/each}
</div>

  

<div class="fixed bottom-8 right-8 flex gap-4 bg-white">
  {#if selectedIdx?.length}
  <C.Button kind="secondary">Return {selectedIdx?.map(i => i+1).join(', ')} for review</C.Button>
  {/if}
  <C.Button kind="tertiary">Approve</C.Button>
  <C.Button kind="danger-tertiary">Reject</C.Button>
</div>