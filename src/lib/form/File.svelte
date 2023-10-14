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

  <div class="flex gap-2 items-center justify-center p-8 border-2 rounded-lg">
    <span>drop here</span>
    <span>/</span>
    <button class="underline">select files</button>
  </div>
  selected: test.pdf, test2.pdf
  <!-- <input type="file" class="w-full bg-transparent outline-none" bind:value/> -->
</div>