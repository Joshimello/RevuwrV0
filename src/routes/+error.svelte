<script lang="ts">
  import { page } from "$app/stores"

  export let data
  $: ({ user } = data)
</script>

<svelte:head>
  <title>{$page.status} | CTLD</title> 
</svelte:head>

<div class="container py-6 flex flex-col gap-6">
  
  {#if !user && $page.status === 403}
  <span class="text-xl">
    <a class="underline" href={'/auth/login?r=' + $page.url.pathname}>
      Login
    </a>
    or
    <a class="underline" href={'/auth/create?r=' + $page.url.pathname}>
      create an account
    </a>
    to continue.                                                        
  </span>
  {:else if user && $page.status === 403}
  <span class="text-xl">
    You don't have permission to access this page.
  </span>
  {/if}

  <span class="text-2xl">
    {$page.status} {$page.error?.message}
  </span>
</div>  