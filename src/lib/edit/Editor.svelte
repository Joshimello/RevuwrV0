<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';
	import script from 'tinymce/tinymce.min.js?url';
  import { schema } from '$lib/stores/edit'
  import { nanoid } from 'nanoid'

  const id = nanoid(8)

  let value = {
    title: '',
    subtitle: ''
  }

  $: value, $schema[id] = {
    type: 'editor',
    value: value
  }
</script>

<div class="flex flex-col gap-1">
  <input
    class="bg-transparent border-2 rounded-lg outline-none p-1"
    placeholder="Title"
    bind:value={value.title}
  />
  <Editor
		disabled
		scriptSrc={script}
		conf={{
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
  <input
    class="bg-transparent border-2 rounded-lg outline-none p-1"
    placeholder="Subtitle"
    bind:value={value.subtitle}
  />
</div>