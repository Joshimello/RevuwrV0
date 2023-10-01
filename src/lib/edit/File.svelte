<script lang="ts">
	import { schema } from '$lib/stores/edit';
	import { nanoid } from 'nanoid';

	const id = nanoid(8);

	let value = {
		title: '',
		subtitle: ''
	};

	$: value,
		($schema[id] = {
			type: 'file',
			value: value
		});
</script>

<div class="flex flex-col gap-1">
	<input
		class="bg-transparent border-2 rounded-lg outline-none p-1"
		placeholder="Title"
		bind:value={value.title}
	/>
	<input type="file" class="bg-transparent border-2 rounded-lg p-2 cursor-not-allowed" disabled />
	<input
		class="bg-transparent border-2 rounded-lg outline-none p-1"
		placeholder="Subtitle"
		bind:value={value.subtitle}
	/>
</div>
