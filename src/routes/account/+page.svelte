<script lang="ts">
  import { page } from "$app/stores"
</script>

<span class="text-xl">
  <a class="underline" href={'/auth/login?r=' + $page.url.pathname}>
    Login
  </a>
  or
  <a class="underline" href={'/auth/login?r=' + $page.url.pathname}>
    create an account
  </a>
  to continue.
</span>