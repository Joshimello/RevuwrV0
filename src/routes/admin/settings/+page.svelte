<script lang="ts">
  import * as Table from "$lib/components/ui/table"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
  import { Button } from "$lib/components/ui/button"
  import { EllipsisVertical, Trash, KeySquare } from "lucide-svelte"
  import { enhance } from '$app/forms'
  import { toast } from "svelte-sonner"
	import { invalidateAll } from "$app/navigation"
  import { Input } from "$lib/components/ui/input"

  export let data
  $: ({ users } = data)

  let forms: HTMLFormElement[] = []
  let search: string = ''
</script>

<Input bind:value={search} type="search" placeholder="111000000" class="max-w-xs mb-4" />

<Table.Root>
  <Table.Header>  
    <Table.Row>
      <Table.Head>School ID</Table.Head>
      <Table.Head>Email</Table.Head>
      <Table.Head>Name</Table.Head>
      <Table.Head>Department</Table.Head>
      <Table.Head>Year</Table.Head>
      <Table.Head>Updated</Table.Head>
      <Table.Head>Role</Table.Head>
      <Table.Head class="text-right">

      </Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each users.filter(user => user.username.includes(search)) as user, idx}
    <form bind:this={forms[idx]} method="POST" action="?/role" use:enhance={() => {
      toast.loading('Updating...')
      return async ({ result }) => {
        if(result.type == 'success') {
          invalidateAll()
          toast.success('Updated!')
        }
        else if (result.type == 'error') toast.error(result.error.message)
      }
    }}>
      <input type="hidden" name="id" value={user.id} />
      <input type="hidden" name="role" value={user.admin} />
    </form>
    <Table.Row>
      <Table.Cell class="font-medium">{user.username}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.department}</Table.Cell>
      <Table.Cell>{user.year}</Table.Cell>
      <Table.Cell>{new Date(user.updated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</Table.Cell>
      <Table.Cell>
        {#if user.admin}
          <span class="text-destructive font-bold">Admin</span>
        {:else}
          <span>User</span>
        {/if}
      </Table.Cell>
      <Table.Cell class="text-right">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button variant="outline" size="icon" builders={[builder]}>
              <EllipsisVertical size="16" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content class="w-56">
            <DropdownMenu.Label class="flex items-center gap-2">
              <KeySquare size="16" />
              Role
            </DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.RadioGroup value={user.admin ? 'admin' : 'user'} onValueChange={value => {
              forms[idx].requestSubmit()
            }}>
              <DropdownMenu.RadioItem value="user" disabled={!user.admin}>User</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="admin" disabled={user.admin}>Admin</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
            <DropdownMenu.Separator />
            <DropdownMenu.Item class="flex items-center gap-2">
              <Trash size="16" />
              Delete user
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Table.Cell>
    </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>