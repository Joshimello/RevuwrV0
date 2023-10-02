<script lang="ts">
	import { TrashIcon } from 'svelte-feather-icons';
	import { schema } from '$lib/stores/edit';

	export let uid: string;

	let value = {
		title: '',
		selections: [''],
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
		{#each value.selections as _, index}
			<div class="flex items-center gap-2">
				<input type="radio" name={uid} disabled />
				<input
					class="bg-transparent border-2 rounded-lg outline-none p-1"
					placeholder="Selection"
					bind:value={value.selections[index]}
				/>
				<button
					class="flex items-center px-2 rounded-lg border-2 w-max"
					on:click={() => {
						value.selections.splice(index, 1);
						value = value;
					}}
				>
					Remove
				</button>
			</div>
		{/each}
		<button
			class="flex items-center px-2 rounded-lg border-2 w-max"
			on:click={() => (value.selections = [...value.selections, ''])}
		>
			Add selection
		</button>
		<input
			class="bg-transparent border-2 rounded-lg outline-none p-1"
			placeholder="Subtitle"
			bind:value={value.subtitle}
		/>
	</div>
</div>
