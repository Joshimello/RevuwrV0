<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';
	import { TrashIcon } from 'svelte-feather-icons';
	import { schema } from '$lib/stores/edit';

	export let uid: string;

	let value = $schema[uid].value || {
		title: '',
		subtitle: ''
	};

	$: value, ($schema[uid].value = value);

	const remove = () => {
		$schema[uid].remove = true;
		// schema.update(s => {
		// 	const t = { ...s }
		// 	delete t[uid];
		// 	return t
		// })
	};
</script>

<div class="flex items-center gap-4">
	<button class="flex items-center justify-center w-12 h-12 border-2 rounded-lg" on:click={remove}>
		<TrashIcon />
	</button>
	<div class="flex flex-col gap-1 w-full">
		<input
			class="bg-transparent border-2 rounded-lg outline-none p-1"
			placeholder="Title"
			bind:value={value.title}
		/>
		<Editor
			scriptSrc="/tinymce/tinymce.min.js"
			disabled
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
</div>
