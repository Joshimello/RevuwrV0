import { redirect, fail, error } from '@sveltejs/kit'

export const load = async ({ params, locals }) => {
  try {
    const records = await locals.pb.collection('applications').getFullList({
      expand: 'responder'
    })
    return { applications: records }
  }
  catch (err) {
    return error(500, err?.message || JSON.stringify(err))
  }
}

export const actions = {
  review: async ({ locals, request, params }) => {
    const data = await request.formData()
    const id = data.get('id') as string
    const review = data.get('review') as string

    try {
      const record = await locals.pb.collection('applications').update(id, {
        status: 'reviewed',
        status_info: review
      })
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }

  }
}