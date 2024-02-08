import { redirect, fail, error } from '@sveltejs/kit'

export const load = async ({ params, locals }) => {
  
  try {
    const record = await locals.pb.collection('events').getOne(params.event)
  }
  catch (err) {
    throw error(404, 'Not found')
  }

}