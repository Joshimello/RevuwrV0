<script lang="ts">
  import * as I from 'svelte-feather-icons'

  const fields = {
    text: I.TypeIcon,
    editor: I.AlignLeftIcon,
    file: I.FilePlusIcon,
    radio: I.CheckCircleIcon,
    checkbox: I.CheckSquareIcon,
  };

  export let data
  const { forminfo, responses } = data;
  const { title, description, schema } = forminfo;

  const formatTime = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(date).toLocaleString('en-US', options);
  }

  const post = async () => {
    const response = await fetch(window.location.href, {
      method: 'POST',
      body: JSON.stringify({})
    });

    const data = await response.json();
    const url = JSON.parse(data.data)[0];
  };
</script>

<div class="h-100vh p-4 flex flex-col gap-4">
  <div class="">
    <span class="text-4xl font-display font-500">
      Form Responses Of <br>{title}
    </span>
  </div>

  <table>
    <tr>
      <th>
        <div class="flex items-center gap-2">
          <I.ClockIcon size="16"/>
          <span>Time</span>
        </div>
      </th>
      {#each Object.values(schema) as { type, value: { title, subtitle } }}
        <th>
          <div class="flex items-center gap-2">
            <svelte:component this={fields[type]} size="16"/>
            <span>{title}</span>
          </div>
        </th>
      {/each}
    </tr>
    
    {#each responses as response}
      <tr>
      <td>{formatTime(response.created)}</td>
      {#each Object.entries(response).slice(0, -5) as [key, value]}
        <td>{value}</td>
      {/each}
      </tr>
    {/each}
  </table>

</div>