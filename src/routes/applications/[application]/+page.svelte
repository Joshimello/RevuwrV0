<script lang="ts">
  import { Separator } from "$lib/components/ui/separator"
  import fieldTypes from "./fieldtypes"

  export let data
  $: ({ user, application } = data)
  $: ({ event } = application.expand)
</script>

<div class="container py-8">

  <div class="flex flex-col">
    <span class="text-2xl font-bold tracking-tight">{event.name}</span>
    <span class="text-muted-foreground">
      Responding as {user.username}.
      <a href="/auth/login" class="underline">Change user</a>
    </span>    
  </div>

  <Separator class="my-6" />

  {#each event.questions as question, idx}
  <svelte:component
    this={fieldTypes[question.type].component}
    idx={idx} bind:content={question.value}/>
  {/each}
</div>



<pre>
  {JSON.stringify(event.questions, null, 2)}
</pre>