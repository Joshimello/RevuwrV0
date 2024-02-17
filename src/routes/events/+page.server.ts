import { error, redirect } from "@sveltejs/kit"

export const load = async ({ locals, depends }) => {
  try {
    const records = await locals.pb.collection('events').getFullList()
    return { events: records }
  }
  catch (err) {
    return error(500, err?.message || JSON.stringify(err))
  }
}

export const actions = {
  default: async ({ locals, request }) => {
    if (!locals.user) {
      return redirect(302, '/auth/login') 
    }

    const data = await request.formData()
    const event = data.get('event')

    try {
      await locals.pb.collection('events').getOne(event)
    }
    catch (err) {
      return error(404, 'Event not found')
    }

    let record = undefined
    try {
      record = await locals.pb.collection('applications').create({
        event: event,
        status: 'draft',
        responder: locals.user.id
      })
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }

    if (record) {
      return redirect(302, '/applications/' + record.id)
    }

    return error(500, 'Unknown error')
  }
}