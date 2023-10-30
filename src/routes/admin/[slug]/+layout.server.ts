import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
  let record
  try {
    record = await locals.pb.collection('applications').getOne(params.slug)    
  }
  catch (err) {
    throw redirect(302, '/admin')
  }
  return record
}