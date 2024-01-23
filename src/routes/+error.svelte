<script lang="ts">
  import { page } from "$app/stores"
</script>

<svelte:head>
  <title>{$page.status} | CTLD</title> 
</svelte:head>

<div class="container py-6">
  <span class="text-2xl">
    {$page.status} {$page.error?.message}
  </span>
</div>