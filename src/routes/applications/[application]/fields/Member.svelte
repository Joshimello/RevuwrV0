<script lang="ts">
  import { Input } from "$lib/components/ui/input"
  import { onMount } from "svelte"
  import * as Table from "$lib/components/ui/table"
	import Button from "$lib/components/ui/button/button.svelte"
  import { page } from "$app/stores"
  import { Trash } from "lucide-svelte"

  export let content: Record<string, any>
  export let idx: number
  export let id: string
  export let value: Record<string, any>
  export let disabled: boolean

  onMount(() => {

    const user = $page.data.user 

    if (value == null) {
      value = {
        id: id,
        type: 'Member',
        question: content.question,
        description: content.description,
        value: [{
          name: user.name,
          email: user.email,
          dept: user.dept,
          id: user.username
        }]
      }
    }
  })

  let newMember = {
    name: '',
    email: '',
    dept: '',
    id: ''
  }

  $: isValidLimit = value?.value.length <= parseInt(content.maxMembers) && value?.value.length >= parseInt(content.minMembers)

</script>

{#if value}
<div class="flex-1 flex flex-col gap-4">
  <div class="py-12 flex flex-col justify-center h-full">
    <div class="relative">
      <span class="absolute text-xs -left-4 top-1">
        {idx + 1}.
      </span>
      <span class="text-xl">
        {@html content.question}
      </span>
    </div>
    <span class="text-sm">
      {@html content.description}
    </span>

    <Table.Root class="mt-8">
      <Table.Header>
        <Table.Row>
          <Table.Head></Table.Head>
          <Table.Head>ID</Table.Head>
          <Table.Head>Name</Table.Head>
          <Table.Head>Email</Table.Head>
          <Table.Head class="text-right">Dept</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each value.value as member, idx}
        <Table.Row>
          <Table.Cell class="w-8 p-0 pl-2">
            <Button disabled={idx < 1 || disabled} size="icon" variant="outline" class="w-7 h-7" on:click={() => {
              value.value.splice(idx, 1)
              value.value = value.value
            }}>
              <Trash size="12" />
            </Button>
          </Table.Cell>
          <Table.Cell>{member.id || 'N/A'}</Table.Cell>
          <Table.Cell class="font-medium">{member.name || 'N/A'}</Table.Cell>
          <Table.Cell>{member.email || 'N/A'}</Table.Cell>
          <Table.Cell class="text-right">{member.dept || 'N/A'}</Table.Cell>
        </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>

    <div class="mt-4 grid md:grid-cols-5 grid-cols-2 gap-2">
      <Input disabled={disabled} class="h-9" placeholder="Kasumi Miyu" bind:value={newMember.name} />
      <Input disabled={disabled} class="h-9" placeholder="name@example.com" bind:value={newMember.email} />
      <Input disabled={disabled} class="h-9" placeholder="EECS" bind:value={newMember.dept} />
      <Input disabled={disabled} class="h-9" placeholder="111000999" bind:value={newMember.id} />
      <Button class="col-span-2 md:col-span-1" size="sm" variant="outline" 
        disabled={!Object.values(newMember).every(i => i.trim().length > 0) || disabled}
        on:click={() => {
          value.value = [...value.value, newMember]
          newMember = {
            name: '',
            email: '',
            dept: '',
            id: ''
          }
        }}>
        Add member
      </Button>
    </div>

    <div class="flex mt-1 gap-2 items-center">
      {#if content.isMaxMembers || content.isMinMembers}
      <span class="text-sm { isValidLimit ? 'text-muted-foreground' : 'text-destructive' }">
        Limit: 
        {#if content.isMinMembers}{content.minMembers} {'≤'}{/if} 
        {value.value.length} 
        {#if content.isMaxMembers} {'≤'} {content.maxMembers}{/if}
      </span>
      {/if}

      {#if content.required}
      <span class="text-sm" class:text-muted-foreground={value.value} class:text-destructive={!value.value}>Required</span>
      {:else}
      <span class="text-muted-foreground text-sm">Optional</span>
      {/if}
    </div>
  </div>
</div>
{/if}