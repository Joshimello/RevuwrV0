<script lang="ts">
  import { Separator } from "$lib/components/ui/separator"
  import { Button } from "$lib/components/ui/button"
  import * as Tabs from "$lib/components/ui/tabs"
  import * as Select from "$lib/components/ui/select"
  import { Badge } from "$lib/components/ui/badge"
	import { ChevronRight } from "lucide-svelte"  
  import { page } from "$app/stores"
  import { goto } from "$app/navigation"

  export let data
  $: ({ events } = data)
  
</script>

<svelte:head>
  <title>Admin | CTLD</title> 
</svelte:head>

<div class="sticky top-[65px] bg-background z-50">
  <div class="container py-1 grid grid-cols-3">

    <div class="flex items-center gap-1">
      <Badge variant="outline">
        <a class="underline" href="/admin">Admin</a>
      </Badge>
      {#if $page.params.event}
      <ChevronRight size="16" />
      <Badge variant="outline" class="text-nowrap">
        {events.find(event => event.id === $page.params.event)?.name}
      </Badge>
      {/if}
    </div>

    <div class="flex items-center justify-center gap-1">
      {#if $page.params.event}
      <Button size="sm" variant="ghost" class="underline" on:click={() => {
        goto('/admin/' + $page.params.event + '/settings', { invalidateAll: true })
      }}>
        Settings
      </Button>
      <Button size="sm" variant="ghost" class="underline" on:click={() => {
        goto('/admin/' + $page.params.event + '/questions', { invalidateAll: true })
      }}>
        Questions
      </Button>
      <Button size="sm" variant="ghost" class="underline" on:click={() => {
        goto('/admin/' + $page.params.event + '/responses', { invalidateAll: true })
      }}>
        Responses
      </Button>
      <Button size="sm" variant="ghost" class="underline" on:click={() => {
        goto('/admin/' + $page.params.event + '/reviews', { invalidateAll: true })
      }}>
        Reviews
      </Button>
      {:else}
      <Button size="sm" variant="ghost"></Button>
      {/if}
    </div>

    <div class="flex items-center gap-1 justify-end">
      <Badge variant="outline">
        <a class="underline text-nowrap" href="/admin/settings">Admin settings</a>
      </Badge>
    </div> 
    
  </div>
</div>

<div class="container py-6">
  <slot/>
</div>