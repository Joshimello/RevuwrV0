import { PB_URL, PB_USER, PB_PASS } from '$env/static/private';
import { error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const load = async ({ params }) => {
	const pb = new PocketBase(PB_URL);
	await pb.admins.authWithPassword(PB_USER, PB_PASS);
	try {
		const record = await pb.collection('forms').getOne(params.slug);
		return record;
	} catch (err) {
		throw error(404, 'Not found');
	}
};

export const actions = {
	default: async ({ request, params }) => {
		const pb = new PocketBase(PB_URL);
		await pb.admins.authWithPassword(PB_USER, PB_PASS);

		const body = await request.json();
		const { title, description, schema } = body;

		await pb.collection('forms').update(params.slug, {
			title: title,
			description: description,
			schema: schema
		});

		return '/edit';
	}
};
