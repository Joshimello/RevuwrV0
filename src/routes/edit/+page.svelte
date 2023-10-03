<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
	console.log(data);
	let forms = data.forms;

	const post = async () => {
		const response = await fetch(window.location.href + '?/create', {
			method: 'POST',
			body: JSON.stringify(null)
		});

		const data = await response.json();
		const url = JSON.parse(data.data)[0];
		await goto(url);
	};

	const edit = (id: string) => {
		goto('/edit/' + id);
	};

	const remove = async (id: string) => {
		const response = await fetch(window.location.href + '?/remove', {
			method: 'POST',
			body: JSON.stringify(id)
		});

		const data = await response.json();
		forms = JSON.parse(data.data)[1];
	};
</script>

<div class="flex flex-col gap-8 p-8">
	<div class="flex flex-col gap-4">
		{#each forms as { id, title, created, updated }}
			<div class="flex gap-4">
				<span>{created}</span>
				<span>{updated}</span>
				<span>{title}</span>
				<button on:click={() => edit(id)}> edit </button>
				<button on:click={() => remove(id)}> remove </button>
			</div>
		{/each}
	</div>

	<div class="flex">
		<button class="border-2 rounded-lg p-2 w-full" on:click={post}> Create new form </button>
	</div>
</div>
