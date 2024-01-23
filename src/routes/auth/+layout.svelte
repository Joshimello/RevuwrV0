<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog"
  import * as Tabs from "$lib/components/ui/tabs"
  import { goto } from "$app/navigation"

  export let open = true
</script>

<svelte:head>
  <title>Auth | CTLD</title> 
</svelte:head>

<AlertDialog.Root bind:open={open}>
  <AlertDialog.Content>
    <Tabs.Root value="login" onValueChange={value => {
        goto('/auth/' + value)
      }}>
      <Tabs.List>
        <Tabs.Trigger value="login">Login</Tabs.Trigger>
        <Tabs.Trigger value="create">Create Account</Tabs.Trigger>
      </Tabs.List>
      <slot />
    </Tabs.Root>
  </AlertDialog.Content>
</AlertDialog.Root>