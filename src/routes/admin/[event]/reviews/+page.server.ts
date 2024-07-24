import { redirect, fail, error } from '@sveltejs/kit'

export const load = async ({ params, locals }) => {
  try {
    const records = await locals.pb.collection('reviews').getFullList({

    })
    return { reviews: records }
  }
  catch (err) {
    return error(500, err?.message || JSON.stringify(err))
  }
}