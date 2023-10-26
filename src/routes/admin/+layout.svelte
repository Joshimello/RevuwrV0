<script>
  import { goto } from '$app/navigation'
  import * as C from 'carbon-components-svelte';
  import Home from "carbon-icons-svelte/lib/Home.svelte";
  import DataTable from "carbon-icons-svelte/lib/DataTable.svelte";
  let isSideNavOpen = false;

  export let data
  const { records } = data
</script>

<C.Header company="NTHU CTLD" platformName="Admin" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <C.SkipToContent />
  </svelte:fragment>
</C.Header>

<C.SideNav bind:isOpen={isSideNavOpen}>
  <C.SideNavItems>
    <C.SideNavLink icon={Home} text="Home" href="/admin"/>
    <C.SideNavDivider/>

    {#each records as { name, id }}
    <C.SideNavMenu icon={DataTable} text={name}>
      <C.SideNavMenuItem text="Edit details" on:click={() => goto('/admin/'+id)}/>
      <C.SideNavMenuItem href={'/admin/'+id+'/questions'} text="Edit questions" />
      <C.SideNavMenuItem href={'/admin/'+id+'/responses'} text="Responses"/>
    </C.SideNavMenu>
    {/each}
  
  </C.SideNavItems>
</C.SideNav>

<C.Content>
  <slot/>
</C.Content>