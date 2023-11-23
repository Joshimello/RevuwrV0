<script>
  import * as C from "carbon-components-svelte";
  export let details, value, name

  if(!value) {
    value = []
  }

  let open = true
  let temp = [...Array(details.fields.length + 1)]
</script>

<input name={name} value={JSON.stringify(value)} class="hidden" />
<div class="grid grid-cols-3 gap-x-16">
  <div class="col-span-1 flex flex-col">
    <span class="text-2xl">{details.title}</span>    
    {#if details.isDescription}
    <div class="reset">{@html details.description}</div>
    {/if}
  </div>
  <div class="col-span-2 flex flex-col gap-2">
    {#if value.length == 0}
    <span class="text-xl">No members invited</span>
    {/if}
    <div class="flex flex-col gap-2">
      {#each value as member}
      <div class="flex gap-1">
        {#each member as val}
        <span>{val}</span>
        {/each}
      </div>
      {/each}
    </div>
    <C.Button size="small" kind="ghost" on:click={() => {
      open = true
    }}>Invite members</C.Button>
  </div>
</div>

<C.Modal passiveModal bind:open={open} modalHeading="Inviting member">
  <form on:submit|preventDefault={() => {
    value = [...value, temp]
    temp = [...Array(details.fields.length + 1)]
    open = false
  }}>
    <div class="flex gap-2">
      <C.TextInput labelText="Email" type="email" bind:value={temp[0]} />
      {#each details.fields as field, idx}
      <C.TextInput labelText={field} bind:value={temp[idx+1]}/>
      {/each}
    </div>
    <div class="flex justify-end mt-4">
      <C.Button type="submit" size="small">Invite</C.Button>
    </div>
  </form>
</C.Modal>