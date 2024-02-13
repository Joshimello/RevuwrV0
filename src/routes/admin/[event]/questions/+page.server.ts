import { error } from '@sveltejs/kit'

export const actions = {
  default: async ({ locals, request, params }) => {
    const data = await request.formData()
    
    try {
      data.append('updated_questions', new Date().toISOString())
      const record = await locals.pb.collection('events').update(params.event, data)
      return { questions: record.questions, updated_questions: record.updated_questions }
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }

  }
}