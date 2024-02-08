<script lang="ts">
  import { Separator } from "$lib/components/ui/separator"
  import { Button } from "$lib/components/ui/button"
  import * as Tabs from "$lib/components/ui/tabs"
  import * as Select from "$lib/components/ui/select"
  
  import Nav from "$lib/components/Nav.svelte"
  import nav from "./nav"

  export let data
  $: ({ user, events } = data)
  $: eventnav = events ? events.map(event => ({ title: event.name, href: '/admin/' + event.id })) : []
</script>

<svelte:head>
  <title>Admin | CTLD</title> 
</svelte:head>

<div class="container py-8">

  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <aside class="-mx-4 lg:w-1/5">
      <Nav class="sticky top-[89px]" items={nav} disabled={!user} />
      <Separator class="m-1"/>
      <Nav class="sticky top-[89px]" items={eventnav} disabled={!user} />
    </aside>
    <div class="flex-1">
      <slot />
    </div>
  </div>

</div>