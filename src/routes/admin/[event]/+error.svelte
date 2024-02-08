<script lang="ts">
  import { page } from "$app/stores"
</script>

<span class="text-2xl">
  {$page.status} {$page.error?.message}
</span>