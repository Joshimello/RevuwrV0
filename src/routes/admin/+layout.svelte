<script lang="ts">
  import { Separator } from "$lib/components/ui/separator"
  import { Button } from "$lib/components/ui/button"
  import * as Tabs from "$lib/components/ui/tabs"
  import * as Select from "$lib/components/ui/select"
  import { Badge } from "$lib/components/ui/badge"
	import { ChevronRight } from "lucide-svelte"  
  import { page } from "$app/stores"

  export let data
  $: ({ events } = data)
  
</script>

<svelte:head>
  <title>Admin | CTLD</title> 
</svelte:head>

<div class="sticky top-0 bg-background">
  <div class="container py-4 flex items-center gap-1">
    <Badge variant="outline">
      <a class="underline" href="/admin">Admin</a>
    </Badge>
    {#if $page.params.event}
    <ChevronRight size="16" />
    <Badge variant="outline">
      {events.find(event => event.id === $page.params.event)?.name}
    </Badge>
    {/if}

    <div class="ml-auto px-2">
      <Separator orientation="vertical" class="h-4" />
    </div>
    <Badge variant="outline">
      <a class="underline text-nowrap" href="/admin/settings">Admin settings</a>
    </Badge>
  </div>
</div>

<div class="container">
  <slot/>
</div>