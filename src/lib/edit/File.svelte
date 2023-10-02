<script lang="ts">
	import { TrashIcon } from 'svelte-feather-icons';
	import { schema } from '$lib/stores/edit';

	export let uid: string;

	let value = {
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
		<input type="file" class="bg-transparent border-2 rounded-lg p-2 cursor-not-allowed" disabled />
		<input
			class="bg-transparent border-2 rounded-lg outline-none p-1"
			placeholder="Subtitle"
			bind:value={value.subtitle}
		/>
	</div>
</div>
