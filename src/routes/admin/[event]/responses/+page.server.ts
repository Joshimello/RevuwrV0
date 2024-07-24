import { redirect, fail, error } from '@sveltejs/kit'
import StatusEmail from '$lib/emails/status'

export const load = async ({ params, locals }) => {
  try {
    const records = await locals.pb.collection('applications').getFullList({
      expand: 'responder',
      filter: `event="${params.event}"`
    })
    return { applications: records }
  }
  catch (err) {
    return error(500, err?.message || JSON.stringify(err))
  }
}

export const actions = {
  approve: async ({ locals, request, params }) => {
    const data = await request.formData()
    const message = data.get('message') as string
    const id = data.get('id') as string

    try {
      const record = await locals.pb.collection('applications').update(id, {
        status: 'approved',
        status_info: message,
      }, {
        expand: 'responder,event'
      })

      const data = await locals.rs.emails.send({
        from: 'ctldsys@nthumods.com',
        to: record.expand.responder.email,
        subject: 'CTLD Application Status Update',
        react: StatusEmail({
          application_id: record.expand.event.settings.responsePrefix + record.application_id.toString(),
          username: record.expand.responder.username,
          application_url: `http://localhost:5173/applications`,
          status: 'approved'
        }),
      })
    }
    catch (err) {
      console.log(err)
      return error(500, err?.message || JSON.stringify(err))
    }
  },
  reject: async ({ locals, request, params }) => {
    const data = await request.formData()
    const message = data.get('message') as string
    const id = data.get('id') as string

    try {
      const record = await locals.pb.collection('applications').update(id, {
        status: 'rejected',
        status_info: message
      })
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }
  },
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

  },
  sendreview: async ({ locals, request, params }) => {
    const data = await request.formData()
    const ids = data.get('ids') as string
    let idList = ids.split(',')

    try {
      const records = await locals.pb.collection('reviews').create({
        'applications': idList,
      })
      return records
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }

  }
}