import { redirect, fail, error } from '@sveltejs/kit'

export const actions = {
  create: async ({ locals, request, url }) => {
    const data = await request.formData()

    try {
      const record = await locals.pb.collection('events').create(data)
      return { id: record.id }
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }
  }

}