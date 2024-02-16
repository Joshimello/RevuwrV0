import { error } from '@sveltejs/kit'

export const actions = {
  default: async ({ locals, request, params }) => {
    const data = await request.formData()
    
    try {
      data.append('updated_settings', new Date().toISOString())
      const record = await locals.pb.collection('events').update(params.event, data)
      return { settings: record.settings, updated_settings: record.updated_settings }
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }

  }
}