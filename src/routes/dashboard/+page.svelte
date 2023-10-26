<script>
  import * as C from "carbon-components-svelte";

  export let data
  const { username, email, admin } = data;

</script>

<div class="p-8">
  <div class="py-4 flex items-center justify-between">
    <h1>Hi, { username }</h1>
    <C.Button href="/apply">New Application</C.Button>
  </div>
  <C.Tabs>
    <C.Tab label="Pending" />
    <C.Tab label="Completed" />
    <svelte:fragment slot="content">
      <C.TabContent>
        <h2>No pending applications</h2>
        <!-- <C.ClickableTile href="/">
          Carbon Design System
        </C.ClickableTile> -->
      </C.TabContent>
      <C.TabContent>
        <h2>No completed applications</h2>
      </C.TabContent>
    </svelte:fragment>
  </C.Tabs>
</div>