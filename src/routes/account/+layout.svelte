<script lang="ts">
  import { Separator } from "$lib/components/ui/separator"
  import Nav from "$lib/components/Nav.svelte"
  import nav from "./nav"

  export let data
  $: ({ user } = data)
</script>

<div class="container py-8">

  <div class="flex flex-col">
    <span class="text-2xl font-bold tracking-tight">Account</span>
    <span class="text-muted-foreground">Manage your account settings.</span>    
  </div>

  <Separator class="my-6" />

  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <aside class="-mx-4 lg:w-1/5">
      <Nav items={nav} disabled={user == undefined} />
    </aside>
    <div class="flex-1 lg:max-w-2xl">
      <slot />
    </div>
  </div>

</div>