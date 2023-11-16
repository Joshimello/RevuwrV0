import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
  let records
  try {
    records = await locals.pb.collection(params.slug).getFullList({
      expand: 'responder,status'
    })
  }
  catch (err) {
    throw redirect(302, '/admin')
  }
  return { records }
}