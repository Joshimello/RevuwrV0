<script lang="ts">
  import Editor from '$lib/components/Editor.svelte'

  let titleValue:string = ''
  let descriptionValue:string

  let formSchema = []
</script>

<div class="w-full flex justify-center p-2">
  <div class="w-200 flex flex-col gap-6">
    <span class="font-bold text-xl">  
      Editing form "{ titleValue }"
    </span>

    <div class="flex flex-col gap-1 w-full">
      <span>
        Title
      </span>
      <input bind:value={titleValue} class="bg-transparent border-2 rounded-lg outline-0 p-2" type="text"/>
    </div>

    <div class="flex flex-col gap-1 w-full">
      <span>
        Description
      </span>
      <Editor bind:value={descriptionValue} />
    </div>

    <div>
      <button class="border-2 rounded-lg p-2 w-full">
        Add Field
      </button>
    </div>

  </div>
</div>

  
