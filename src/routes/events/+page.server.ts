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


    // Check if event exists
    let eventRecord = undefined
    try {
      eventRecord = await locals.pb.collection('events').getOne(event)
    }
    catch (err) {
      return error(404, 'Event not found')
    }


    // Check if user has passed response limit
    let limitPassed = undefined
    try {
      const applications = await locals.pb.collection('applications').getFullList({
        filter: `responder.id = "${locals.user.id}"`,
      })
      if (applications.length >= parseInt(eventRecord.settings.responseLimit)) {
        limitPassed = applications.length
      }
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }

    if (limitPassed) {
      return error(403, 'Response limit of ' + eventRecord.settings.responseLimit + ' reached')
    }


    // Create application
    let record = undefined
    try {
      eventRecord = await locals.pb.collection('events').update(eventRecord.id, {
        'application_count+': 1
      })

      record = await locals.pb.collection('applications').create({
        event: eventRecord.id,
        application_id: eventRecord.application_count,
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