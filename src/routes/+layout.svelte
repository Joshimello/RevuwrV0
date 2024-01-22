<script lang="ts">
  import '../app.pcss'
  import '@fontsource-variable/inter'
  
  import * as Select from "$lib/components/ui/select"
  import { Separator } from "$lib/components/ui/separator"
  import { Button } from "$lib/components/ui/button"
  import { ModeWatcher, toggleMode } from "mode-watcher"
  import { Sun, Moon } from "lucide-svelte"
  import { goto } from "$app/navigation"
  import { page } from '$app/stores'
  import routes from "$lib/routes"

  $: route = $page.route.id?.split('/')[1] || ''
</script>

<ModeWatcher />

<div class="sticky top-0 bg-background">
  <div class="flex items-center gap-2 container py-3">

    <div class="mr-auto">
      <span class="text-lg font-semibold">CTLD</span>   
    </div>

    <Select.Root selected={routes[route]} onSelectedChange={value => {
      goto(value.value)
    }} >
      <Select.Trigger class="w-[180px]">
        <div class="flex items-center gap-2">
          <svelte:component this={routes[route].icon} size="16" />
          <Select.Value />
        </div>
      </Select.Trigger>
      <Select.Content>
        {#each Object.values(routes) as { value, label, icon, hidden }}
        {#if !hidden}
        <Select.Item value={value} class="flex gap-2 items-center">
          <svelte:component this={icon} size="16" />
          {label}
        </Select.Item>
        {/if}
        {/each}
      </Select.Content>
    </Select.Root>

    <Button on:click={toggleMode} variant="outline" size="icon">
      <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
      <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
    </Button>
  
  </div>
  <Separator />
</div>

<slot>
  
</slot>