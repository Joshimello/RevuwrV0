<script>
	import * as C from 'carbon-components-svelte'
	import '$lib/css/fonts.css'
	import 'virtual:windi.css'
	import 'carbon-components-svelte/css/all.css'
	import '$lib/css/main.css'

  import { fade } from 'svelte/transition';
  import { navigating } from '$app/stores'
</script>

{#if $navigating}
<div class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white z-99" transition:fade={{ duration: 100 }}>
  <img class="h-50" src="/loader.gif" alt="" />
</div>
{/if}
<slot />

<C.Theme theme="white" />