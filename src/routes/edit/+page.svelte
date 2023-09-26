<script lang="ts">
	import * as I from 'svelte-feather-icons';
	import Editor from '$lib/components/Editor.svelte';

	let titleValue: string = '';
	let descriptionValue: string;

	let formSchema = [];

	const allowedFields = [
		{ type: 'text', icon: I.TypeIcon },
		{ type: 'radio', icon: I.CheckCircleIcon },
		{ type: 'checkbox', icon: I.CheckSquareIcon },
		{ type: 'image', icon: I.FilePlusIcon }
	];
</script>

<div class="w-full flex justify-center p-2">
	<div class="w-200 flex flex-col gap-6">
		<span class="font-bold text-xl">
			Editing form "{titleValue}"
		</span>

		<div class="flex flex-col gap-1 w-full">
			<span> Title </span>
			<input
				bind:value={titleValue}
				class="bg-transparent border-2 rounded-lg outline-0 p-2"
				type="text"
			/>
		</div>

		<div class="flex flex-col gap-1 w-full">
			<span> Description </span>
			<Editor bind:value={descriptionValue} />
		</div>

		<div class="flex flex-col gap-1 w-full">
			<span> Add field </span>
			<div class="flex gap-2">
				{#each allowedFields as { type, icon }}
					<button class="border-2 rounded-lg flex items-center justify-center aspect-square h-10">
						<svelte:component this={icon} />
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>
