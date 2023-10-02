<script lang="ts">
	import * as I from 'svelte-feather-icons';
	import { nanoid } from 'nanoid'
	import { schema } from '$lib/stores/edit';

	import Title from '$lib/edit/Title.svelte'
	import Description from '$lib/edit/Description.svelte'
	import Text from '$lib/edit/Text.svelte';
	import File from '$lib/edit/File.svelte';
	import Radio from '$lib/edit/Radio.svelte';
	import Editor from '$lib/edit/Editor.svelte';
	import Checkbox from '$lib/edit/Checkbox.svelte';

	schema.subscribe(() => {
		console.log(JSON.stringify($schema, undefined, 2));
	});

	const fields: { [key: string]: { icon: any; comp: any } } = {
		text: { icon: I.TypeIcon, comp: Text },
		editor: { icon: I.AlignLeftIcon, comp: Editor },
		file: { icon: I.FilePlusIcon, comp: File },
		radio: { icon: I.CheckCircleIcon, comp: Radio },
		checkbox: { icon: I.CheckSquareIcon, comp: Checkbox }
	};

	const addField = (field:string) => {
		$schema[nanoid(8)] = { type: field }
	}
</script>

<div class="flex flex-col gap-8 p-8">
	<Title/>
	<Description/>

	{#each Object.entries($schema) as [uid, { type, remove }]}
		{#if !remove}
			<svelte:component this={fields[type].comp} {uid}/>
		{/if}
	{/each}

	<div class="flex flex-col">
		<span> Add field </span>
		<div class="flex gap-2">
			{#each Object.keys(fields) as field}
				<button
					class="flex items-center justify-center border-2 w-12 h-12 rounded-lg"
					on:click={() => addField(field)}
				>
					<svelte:component this={fields[field].icon} />
				</button>
			{/each}
		</div>
	</div>
</div>
