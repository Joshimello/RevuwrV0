<script lang="ts">
  import '../app.pcss'
  import '@fontsource-variable/inter'
  
  import { Separator } from "$lib/components/ui/separator"
  import * as Select from "$lib/components/ui/select"
  import { Toaster } from "$lib/components/ui/sonner"
  import { Button } from "$lib/components/ui/button"
  import { ModeWatcher, toggleMode } from "mode-watcher"
  import { page, navigating } from "$app/stores"
  import { Sun, Moon } from "lucide-svelte"
  import { fade } from "svelte/transition"
  import { goto } from "$app/navigation"
  import { browser } from "$app/environment"
  import routes from "./routes"

  export let data
  $: ({ user } = data)

  $: route = $page.url.pathname.split(/(?=\/)/)[0]
  $: selected = routes[route] || routes['empty']

  $: if (browser) {
    console.log($page.data)
  }
</script>

<ModeWatcher />
<Toaster />

<div class="sticky top-0 bg-background">
  <div class="flex items-center gap-2 container py-3">

    <div class="mr-auto">
      <span class="text-lg font-semibold">CTLD</span>   
    </div>

    <Select.Root selected={selected} onSelectedChange={value => {
      goto(value.value)
    }} >
      <Select.Trigger class="w-[180px]">
        <div class="flex items-center gap-2">
          <svelte:component this={selected.icon} size="16" />
          <Select.Value />
        </div>
      </Select.Trigger>
      <Select.Content>
        {#each Object.values(routes) as { value, label, icon, hidden, admin }}
        {#if !hidden && (!admin || user?.admin)}
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

{#if $navigating}
<div class="absolute top-[65px] bottom-0 left-0 right-0 flex items-center justify-center bg-white z-99" transition:fade={{ duration: 100 }}>
  <img class="h-48" src="/loader.gif" alt="" />
</div>
{:else}
<slot>
  
</slot>
{/if}