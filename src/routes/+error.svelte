<script lang="ts">
  import { page } from "$app/stores"
</script>

<div class="container py-6">
  <span class="text-2xl">
    {$page.status} {$page.error?.message}
  </span>
</div>