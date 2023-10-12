import PocketBase from 'pocketbase';
import { PB_URL, PB_USER, PB_PASS } from '$env/static/private';

export const load = async () => {
	const pb = new PocketBase(PB_URL);
	await pb.admins.authWithPassword(PB_USER, PB_PASS);

	const records = await pb.collection('forms').getFullList();

	return {
		forms: records
	};
};
