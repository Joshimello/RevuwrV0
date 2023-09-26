import { PB_URL, PB_USER, PB_PASS } from '$env/static/private';
import PocketBase from 'pocketbase';

const createForm = async () => {
	const pb = new PocketBase(PB_URL);
	await pb.admins.authWithPassword(PB_USER, PB_PASS);
	await pb.collections.create({
		name: 'aaaase',
		type: 'base',
		schema: [{ name: 'title', type: 'text' }]
	});
};
