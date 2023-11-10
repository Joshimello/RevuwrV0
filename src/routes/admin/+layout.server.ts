import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
  const records = await locals.pb.collection('applications').getFullList({
    fields: 'id,name'
  })
  return { records }
}