import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
  let response, records
  try {
    response = await locals.pb.collection(params.slug).getOne(params.resp) 
    records = await locals.pb.collection(params.slug).getFullList({
      expand: 'status',
      fields: 'id,serial,expand.status,0'
    })
  }
  catch (err) {
    throw redirect(302, '/admin')
  }
  return { response, records }
}