import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
  let collection
  try {
    collection = await locals.pb.collection(params.slug).getFullList()    
  }
  catch (err) {
    throw redirect(302, '/admin')
  }
  return { collection }
}