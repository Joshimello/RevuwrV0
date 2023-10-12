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

		const filteredSchema = Object.keys(schema).reduce((acc, key) => {
			if(!schema[key].remove){
				acc[key] = schema[key]
			}
			return acc
		}, {})

		await pb.collection('forms').update(params.slug, {
			title: title,
			description: description,
			schema: filteredSchema
		});

		const collectionSchema = Object.entries(schema)
		.filter(i => !i[1].remove)
		.map(i => {
			if(i[1].type == 'text'){
				return {
					type: 'text',
					name: i[0]
				}
			}
			else if(i[1].type == 'editor'){
				return {
					type: 'editor',
					name: i[0]
				}
			}
			else if(i[1].type == 'file'){
				return {
					type: 'file',
					name: i[0],
					options: {
						maxSelect: 1,
						maxSize: 5242880,
					}
				}
			}
			else if(i[1].type == 'radio'){
				return {
					type: 'select',
					name: i[0],
					options: {
						maxSelect: 1,
						values: i[1].value.selections,
					}
				}
			}
			else if(i[1].type == 'checkbox'){
				return {
					type: 'select',
					name: i[0],
					options: {
						maxSelect: i[1].value.selections.length,
						values: i[1].value.selections,
					}
				}
			}
		})

		await pb.collections.update(params.slug, {
			name: params.slug,
			type: 'base',
			schema: collectionSchema,
		})

		return '/edit';
	}
};
