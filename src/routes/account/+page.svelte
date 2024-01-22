<script lang="ts">
  import { Button } from "$lib/components/ui/button"

  export let data
  $: ({ user } = data)
</script>

<span class="text-xl">
  <button class="underline">
    Login
  </button>
  or
  <button class="underline">
    create an account
  </button>
  to continue.
</span>