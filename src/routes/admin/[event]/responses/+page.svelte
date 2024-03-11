<script lang="ts">
  import DataTable from "./DataTable.svelte"

  export let data
  $: ({ applications, event } = data)

</script>

{#if applications}
{#key applications}
<DataTable records={applications} event={event} />
{/key}
{:else}
<p>Loading...</p>
{/if}
