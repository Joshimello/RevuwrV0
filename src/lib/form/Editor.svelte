<script lang="ts">
  import Editor from '@tinymce/tinymce-svelte';

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

  <div class="bg-c3 rounded-xl">
    <Editor
      scriptSrc="/tinymce/tinymce.min.js"
      bind:value
      conf={{
        placeholder: title,
        branding: false,
        promotion: false,
        menubar: false,
        resize: true,
        plugins: [
          'autoresize',
          'autolink',
          'lists',
          'link',
          'image',
          'searchreplace',
          'fullscreen',
          'media',
          'table',
          'code',
          'codesample',
          'directionality'
        ],
        toolbar:
          'styles bold italic forecolor backcolor | bullist numlist link image table | codesample direction code fullscreen'
      }}
    />
  </div>
</div>