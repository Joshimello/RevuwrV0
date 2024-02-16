import { redirect, fail, error } from '@sveltejs/kit'
import defaultSettings from './[event]/settings/defaultSettings'

export const actions = {
  create: async ({ locals, request, url }) => {
    const data = await request.formData()

    try {
      data.append('settings', JSON.stringify(defaultSettings))
      const record = await locals.pb.collection('events').create(data)
      return { id: record.id }
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }
  }

}