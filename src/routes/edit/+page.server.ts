import { PB_URL, PB_USER, PB_PASS } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const load = async ({ params }) => {
	const pb = new PocketBase(PB_URL);
	await pb.admins.authWithPassword(PB_USER, PB_PASS);

	const records = await pb.collection('forms').getFullList({
		sort: '-created'
	});

	return {
		forms: records
	};
};

export const actions = {
	create: async ({ request }) => {
		const body = await request.json();

		const pb = new PocketBase(PB_URL);
		await pb.admins.authWithPassword(PB_USER, PB_PASS);

		const data = {
			title: '',
			description: '',
			schema: {}
		};

		const record = await pb.collection('forms').create(data);
		return '/edit/' + record.id;
	},

	remove: async ({ request }) => {
		const pb = new PocketBase(PB_URL);
		await pb.admins.authWithPassword(PB_USER, PB_PASS);

		const id = await request.json();
		await pb.collection('forms').delete(id);

		const records = await pb.collection('forms').getFullList({
			sort: '-created'
		});

		return {
			forms: records
		};
	}
};
