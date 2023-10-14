<script lang="ts">
  export let params, value:string = ''
  const { title, subtitle } = params
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col">
    <span class="text-xl font-500">
      {title}
    </span>
    <span class="font-300">
      {subtitle}
    </span>
  </div>

  <input
    bind:value
    type="text"
    placeholder={title}
    class="w-full bg-transparent outline-none border-b-2 rounded-xl py-1 px-2 text-xl"
  />
</div>