<script>
  import * as C from "carbon-components-svelte";

  export let data, form
  const { username, email, admin } = data;
</script>

<div class="flex flex-col gap-4">
  <h1>Hi, { username }</h1>
  <C.FluidForm
    class="flex flex-col w-80"
    method="post"
    action=""
  >
    {#if form}
      <C.InlineNotification title="Error occurred"/>
    {/if}
    <C.Button type="submit">Create application</C.Button>
  </C.FluidForm>
</div>