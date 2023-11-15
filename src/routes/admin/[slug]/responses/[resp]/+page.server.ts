import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
  let response
  try {
    response = await locals.pb.collection(params.slug).getOne(params.resp)    
  }
  catch (err) {
    throw redirect(302, '/admin')
  }
  return { response }
}