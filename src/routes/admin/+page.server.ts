import { redirect, fail, error } from '@sveltejs/kit'

export const actions = {
  create: async ({ locals, request, url }) => {
    const data = await request.formData()

    try {
      const record = await locals.pb.collection('events').create(data)
      return { type: 'success', message: 'Event created successfully', redirect: '/admin/' + record.id }
    }
    catch (err) {
      if (err.status == 400) {
        return fail(400, { type: 'error', message: 'Error creating' })
      }
      if (err.status == 403) {
        return fail(400, { type: 'error', message: 'Database issue' })
      }
      return fail(400, { type: 'error', message: 'Unknown issue' })
    }
  }

}