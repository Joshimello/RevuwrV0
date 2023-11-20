<script>
  import * as C from 'carbon-components-svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte'
  import User from "carbon-icons-svelte/lib/User.svelte"
  import Email from "carbon-icons-svelte/lib/Email.svelte"
  import DocumentMultiple_01 from "carbon-icons-svelte/lib/DocumentMultiple_01.svelte"

  import Editor from '$lib/Editor.svelte'

  const imgUrl = 'https://ctld.pockethost.io/api/files/'
  
  export let data, form
  $: ({ questions, response, records, statuses, idprefix, id, replyto, mailas } = data)

  let search = ''
  let selectedStatus = ''
  
  let selected
  onMount(() => {
    selected = questions.map(_ => false)
    selectedStatus = response.expand.status[0].id
  })

  $: selectedIdx = selected?.reduce((a, v, i) => v ? [...a, i] : a, [])

  let mailopen = false
  let mailcontent = ''

</script>

{#if form?.success == false}
  <C.InlineNotification title="Error updating"/>
{:else if form?.success == true}
  <C.InlineNotification kind="success" title="Successfully updated"/>
{/if}

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

<div class="w-full flex gap-4 mt-8">
  <C.Tile class="w-full">
    <div class="flex items-center gap-2">
      <DocumentMultiple_01/>
      <span>{idprefix + response.serial.padStart(3, '0')}</span>
    </div>
    <div class="mt-1">
      <span class="font-bold text-xl" style:color={response.expand.status[0].color}>
        {response.expand.status[0].title}
      </span>
    </div>
    <div class="mt-2">
      <form class="flex" action="?/change" method="POST">
        <input value={selectedStatus} name="status" class="hidden" />
        <C.Dropdown
          size="sm"
          bind:selectedId={selectedStatus}
          items={statuses}
          itemToString={(item) => {
            return item.title
          }}
        />
        <C.Button size="small" type="submit" disabled={selectedStatus == response.expand.status[0].id}>Change status</C.Button>
      </form>
    </div>
  </C.Tile>
  <C.Tile class="w-full">
    <div class="flex items-center gap-2">
      <User/>
      <span>{response.expand.responder[0].name} ({response.expand.responder[0].username})</span>
    </div>
    <div class="flex items-center gap-2 mt-2">
      <Email/>
      <span>{response.expand.responder[0].email}</span>
    </div>
    <div class="mt-4">
      <C.Button size="small" on:click={() => mailopen = true}>Send mail</C.Button>
    </div>
  </C.Tile>
</div>

<div class="flex flex-col gap-4 pt-8 pb-32">
  {#each questions as { type, details: { title } }, idx}
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
  <hr>
  {/each}
</div>

<div class="fixed bottom-8 right-8 flex gap-4 bg-white">
  {#if selectedIdx?.length}
  <form action="?/review" method="POST">
    <input value={JSON.stringify(selectedIdx)} class="hidden" name="fields">
    <C.Button type="submit" kind="secondary">Return {selectedIdx?.map(i => i+1).join(', ')} for review</C.Button>
  </form>
  {/if}
  <form action="?/approve" method="POST">
    <C.Button type="submit" kind="tertiary">Approve</C.Button>
  </form>
  <form action="?/reject" method="POST">
    <C.Button type="submit" kind="danger-tertiary">Reject</C.Button>
  </form>
</div>

<C.Modal
  bind:open={mailopen}
  modalHeading="Sending mail"
  passiveModal
>
  <form action="?/mail" method="POST">
    <C.TextInput name="email" value={response.expand.responder[0].email} placeholder="Receiver" />
    <C.TextInput name="subject" placeholder="Subject" />
    <Editor placeholder="Content" bind:value={mailcontent} />
    <hr class="border-gray-500">
    <C.TextInput name="mailas" value={mailas} inline labelText="Will send as:" readonly/>
    <C.TextInput name="replyto" placeholder="Reply To" value={replyto} inline labelText="Will reply to:" />
    <div class="flex justify-end pt-4">
      <input class="hidden" value={mailcontent} name="content" />
      <C.Button type="submit" kind="primary">Send</C.Button>
    </div>
  </form>
</C.Modal>