<script lang="ts">
	import { schema } from '$lib/stores/edit';
	import { nanoid } from 'nanoid';

	const id = nanoid(8);

	let value = {
		title: '',
		selections: [''],
		subtitle: ''
	};

	$: value,
		($schema[id] = {
			type: 'radio',
			value: value
		});
</script>

<div class="flex flex-col gap-1">
	<input
		class="bg-transparent border-2 rounded-lg outline-none p-1"
		placeholder="Title"
		bind:value={value.title}
	/>
	{#each value.selections as _, index}
		<div class="flex items-center gap-2">
			<input type="radio" name={id} disabled />
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
