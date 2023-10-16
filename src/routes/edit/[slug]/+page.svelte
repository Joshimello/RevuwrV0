<script lang="ts">
	import { goto } from '$app/navigation';
	import * as I from 'svelte-feather-icons';

	import { title, description, schema, start, end } from '$lib/stores/edit';

	import Title from '$lib/edit/Title.svelte';
	import Description from '$lib/edit/Description.svelte';

	import Text from '$lib/edit/Text.svelte';
	import File from '$lib/edit/File.svelte';
	import Radio from '$lib/edit/Radio.svelte';
	import Editor from '$lib/edit/Editor.svelte';
	import Checkbox from '$lib/edit/Checkbox.svelte';

	const fields: { [key: string]: { icon: any; comp: any } } = {
		text: { icon: I.TypeIcon, comp: Text },
		editor: { icon: I.AlignLeftIcon, comp: Editor },
		file: { icon: I.FilePlusIcon, comp: File },
		radio: { icon: I.CheckCircleIcon, comp: Radio },
		checkbox: { icon: I.CheckSquareIcon, comp: Checkbox }
	};

	const addField = (field: string) => {
		const uid = new Date().getTime()
		$schema[uid] = { type: field };
	};

	const post = async () => {
		const response = await fetch(window.location.href, {
			method: 'POST',
			body: JSON.stringify({
				title: $title,
				description: $description,
				schema: $schema,
				start: $start,
				end: $end
			})
		});

		const data = await response.json();
		const url = JSON.parse(data.data)[0];
		await goto(url);
	};

	export let data;
	$title = data.title;
	$description = data.description;
	$schema = data.schema;
	$start = data.start ? new Date(data.start).toISOString().slice(0, 19).replace('T', ' ') : undefined;
	$end = data.end ? new Date(data.end).toISOString().slice(0, 19).replace('T', ' ') : undefined;

	// schema.subscribe(() => {
	// 	console.log(JSON.stringify($schema, undefined, 2));
	// });
</script>

<div class="flex flex-col gap-8 p-8">
	<Title />
	<Description />

	<div class="flex items-center gap-8">
		<div class="flex flex-col gap-1">
			<span>Starting Date</span>
			<input class="bg-transparent border-2 rounded-xl p-2" type="datetime-local" bind:value={$start} />
		</div>
		<span>-></span>
		<div class="flex flex-col gap-1">
			<span>Ending Date</span>
			<input class="bg-transparent border-2 rounded-xl p-2" type="datetime-local" bind:value={$end} />
		</div>
	</div>

	{#each Object.entries($schema) as [uid, { type, remove }]}
		{#if !remove}
			<svelte:component this={fields[type].comp} {uid} />
		{/if}
	{/each}

	<div class="flex flex-col gap-1">
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

	<div class="flex">
		<button class="border-2 rounded-lg p-2 w-full" on:click={post}> Save form </button>
	</div>
</div>
