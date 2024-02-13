import { redirect, fail, error } from '@sveltejs/kit'

export const load = async ({ params, locals }) => {
  
  try {
    const record = await locals.pb.collection('events').getOne(params.event)
    return { event: record }
  }
  catch (err) {
    return error(500, err?.message || JSON.stringify(err))
  }

}