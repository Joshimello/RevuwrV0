<script lang="ts">
  import * as Card from "$lib/components/ui/card"
  import { Input } from "$lib/components/ui/input"
  import Editor from "$lib/components/Editor.svelte"
  import { Checkbox } from "$lib/components/ui/checkbox"
  import Label from "$lib/components/ui/label/label.svelte"
	import Button from "$lib/components/ui/button/button.svelte"
  import * as Table from "$lib/components/ui/table"
  
  export let value: Record<string, any>
  export let idx: number
</script>

<div class="flex-1 flex flex-col gap-4">
  <Card.Root class="py-12">
    <Card.Content class="pb-0 px-16 flex flex-col justify-center h-full">
      <div class="relative">
        <span class="absolute text-xs -left-4 top-1">
          {idx + 1}.
        </span>
        <Editor bind:value={value.question} placeholder="Your question here" class="text-xl outline-none" />
      </div>
      <Editor bind:value={value.description} placeholder="Description (optional)" class="text-sm outline-none" />
      
      <Table.Root class="mt-8">
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-[100px]">Name</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Dept</Table.Head>
            <Table.Head class="text-right">ID</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>111000000</Table.Cell>
            <Table.Cell class="font-medium">name</Table.Cell>
            <Table.Cell>name@example.com</Table.Cell>
            <Table.Cell class="text-right">EECS</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>111000999</Table.Cell>
            <Table.Cell class="font-medium">example</Table.Cell>
            <Table.Cell>example@name.com</Table.Cell>
            <Table.Cell class="text-right">CS</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      <div class="mt-4 flex justify-end">
        <Button size="sm" variant="outline" disabled>
          Add member
        </Button>
      </div>

    </Card.Content>
  </Card.Root>

  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <Checkbox bind:checked={value.required} />
      <Label>Required</Label>
    </div>
    <div class="flex items-center gap-2">
      <Checkbox bind:checked={value.isMinMembers} />
      <Label>Min members</Label>
      {#if value.isMinMembers}
        <Input placeholder="0-99999" type="number" class="max-w-32 ml-4 h-4 p-1" bind:value={value.minMembers} />
      {/if}
    </div>
    <div class="flex items-center gap-2">
      <Checkbox bind:checked={value.isMaxMembers} />
      <Label>Max members</Label>
      {#if value.isMaxMembers}
        <Input placeholder="0-99999" type="number" class="max-w-32 ml-4 h-4 p-1" bind:value={value.maxMembers} />
      {/if}
    </div>
  </div>
</div>