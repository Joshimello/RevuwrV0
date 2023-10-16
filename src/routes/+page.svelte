<script lang="ts">
  import { goto } from '$app/navigation';
  import { timeleft } from '$lib/time'
  import * as I from 'svelte-feather-icons'

  export let data
  const { forms } = data

  const create = async () => {
    const response = await fetch(window.location.href, {
      method: 'POST',
      body: JSON.stringify(null)
    });

    const data = await response.json();
    const url = JSON.parse(data.data)[0];
    await goto(url);
  };

  const isAdmin = true
</script>

<div class="h-100vh p-4 flex flex-col gap-4">

  <div class="flex justify-between items-center">
    <div>
      <img class="h-12" src="/logo.png" alt="logo" />
    </div>

    <!-- <div class="h-full flex items-center gap-6 px-6 bg-gray-200 rounded-full">
      <span class="font-500">Forms</span>
    </div> -->

    <div class="flex gap-2">
      <button class="h-12 w-12 flex items-center justify-center rounded-full border-2 border-gray-200">
        <I.SearchIcon size="16"/>
      </button>
      <button class="h-12 w-12 flex items-center justify-center rounded-full border-2 border-gray-200">
        <I.BellIcon size="16"/>
      </button>
      <div class="flex items-center gap-2 pr-5 bg-gray-200 rounded-full">
        <div class="h-12 w-12 flex items-center justify-center bg-white rounded-full border-2 border-gray-200">
          <I.UserIcon size="16"/>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-500">Joshua L</span>
          <span class="text-xs">
            {isAdmin ? 'Admin' : 'Student'}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-between">
    <span class="text-4xl font-display font-500">
      Ongoing <br>Forms List
    </span>

    {#if isAdmin}
    <button class="px-4 py-2 bg-black rounded-full text-white flex items-center gap-2" on:click={create}>
      <I.PlusIcon size="20"/>
      <span class="font-600">Create Form</span>
    </button>
    {/if}
  </div>

  <div class="flex flex-col gap-2">
    {#each forms as { created, updated, title, id, start, end }}
      <div class="flex rounded-full p-2 gap-1 items-center border-1 border-black">

        <div class="h-12 w-12 flex items-center justify-center">
          <I.FileTextIcon/>
        </div>

        <div class="flex flex-col mr-auto flex-1">
          <span class="font-500 truncate">{title}</span>
          <div class="flex items-center gap-1">
            <I.ClockIcon size="12"/>
            <span class="text-sm">{timeleft(end, 'zh')}</span>
          </div>
        </div>

        <a class="h-12 w-12 flex items-center justify-center bg-black rounded-full text-white" href={'/form/' + id}>
          <I.ArrowUpRightIcon/>
        </a>

        {#if isAdmin}
        <a class="h-12 w-12 flex items-center justify-center bg-lime-500 rounded-full text-white" href={'/stat/' + id}>
          <I.BarChart2Icon/>
        </a>

        <a class="h-12 w-12 flex items-center justify-center bg-yellow-500 rounded-full text-white" href={'/edit/' + id}>
          <I.EditIcon/>
        </a>
        {/if}

        <!-- <a class="h-12 w-12 flex items-center justify-center bg-red-500 rounded-full text-white" href={'/del/' + id}>
          <I.TrashIcon/>
        </a> -->
      </div>
    {/each}
  </div>

</div>