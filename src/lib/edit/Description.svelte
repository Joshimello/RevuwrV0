<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';
	import { description } from '$lib/stores/edit';
</script>

<div class="flex flex-col gap-1">
	<span> Description </span>
	<Editor
		scriptSrc="/tinymce/tinymce.min.js"
		bind:value={$description}
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
</div>
