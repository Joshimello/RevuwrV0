<script lang="ts">
  import { cn } from "$lib/utils"
  import { page } from "$app/stores"
  import { Button } from "$lib/components/ui/button"
  import { cubicInOut } from "svelte/easing"
  import { crossfade } from "svelte/transition"

  let className: string | undefined | null = undefined
  export let items: { href: string; title: string }[]
  export { className as class }
  export let disabled: boolean = false

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut
  })
</script>

<nav class={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)}>
  {#each items as item}
    {@const isActive = $page.url.pathname === item.href}
    {@const condProps = disabled ? { disabled: true } : { href: item.href } }

    <Button
      {...condProps}
      variant="ghost"
      class={cn(
        !isActive && "hover:underline",
        "relative justify-start hover:bg-transparent"
      )}
      data-sveltekit-noscroll
    >
      {#if isActive}
        <div
          class="absolute inset-0 rounded-md bg-muted"
          in:send={{ key: "active-sidebar-tab" }}
          out:receive={{ key: "active-sidebar-tab" }}
        />
      {/if}
      <div class="relative">
        <span class="font-bold">
          {item.title}
        </span>
      </div>
    </Button>
  {/each}
</nav>