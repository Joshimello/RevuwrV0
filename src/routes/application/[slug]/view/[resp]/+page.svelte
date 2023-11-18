<script>
  import * as C from "carbon-components-svelte";
  import { onMount } from 'svelte'

  const imgUrl = 'https://ctld.pockethost.io/api/files/'

  export let data
  $: ({ user, question, answer } = data)
  $: ({ id, questions, idprefix } = question)
  $: ({ statusinfo, serial } = answer)

</script>

<C.Content>
  <h1>Viewing application {idprefix + serial.padStart(3, '0')}</h1>
  <div class="flex flex-col gap-8 pt-8">
    {#each questions as { type, details: { title } }, idx}
    <hr>
    <div class="flex w-full items-center gap-2">
      <div class="w-full grid grid-cols-4 gap-4 items-center">
        <span>{idx+1}. {title}</span>
        <div class="col-span-3">
          {#if type == 'Table'}
          <div class="grid gap-2" style:grid-template-columns={'repeat('+answer[idx][0].length+', minmax(0, 1fr))'}>
            {#each answer[idx] as row, i}
            {#each answer[idx][i] as cell, j}
            <span>{cell}</span>
            {/each}
            {/each}
          </div>
          {:else if type == 'File'}
          <div class="flex flex-col gap-2">
            {#each answer[idx] as file}
              {#if ['jpg', 'jpeg', 'png', 'gif'].includes(file.split('.').pop().toLowerCase())}
              <a href={imgUrl+id+'/'+answer.id+'/'+file} target="_blank">
                <img class="h-30" src={imgUrl+id+'/'+answer.id+'/'+file} alt="" />
              </a>
              {:else}
              <a href={imgUrl+id+'/'+answer.id+'/'+file} download={file}>{file}</a>
              {/if}
            {/each}
          </div>
          {:else}
          {answer[idx]}
          {/if}
        </div>
      </div>
    </div>
    {/each}
  </div>
</C.Content>


    