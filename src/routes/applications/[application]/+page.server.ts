import { error, redirect } from "@sveltejs/kit"
import { PB_URL } from '$env/static/private'

export const load = async ({ locals, params }) => {
  try {
    const record = await locals.pb.collection('applications').getOne(params.application, {
      expand: 'event'
    })

    return { application: record }
  }
  catch (err) {
    return error(500, err?.message || JSON.stringify(err))
  }
}

export const actions = {
  submit: async ({ locals, request, params }) => {

    let record: Record<string, any>

    try {
      record = await locals.pb.collection('applications').getOne(params.application)
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }

    if (!['draft', 'reviewed'].includes(record.status)) {
      return error(400, `Application is not in draft status`)
    }

    const data = await request.formData()
    const action = data.get('action')
    const response = data.get('response')
    const updated_response = new Date().toISOString()

    try {
      record = await locals.pb.collection('applications').update(params.application, {
        ...(action == 'submit' && { status: 'submitted' }),
        response: response,
        updated_response: updated_response
      })
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }

    if (record) {
      return redirect(302, '/applications/')
    }
    
    return error(500, 'Unknown error')

  },
  file: async ({ locals, request }) => {
    const data = await request.formData()
    data.append('user', locals.user.id)

    try {
      const record = await locals.pb.collection('files').create(data)
      const files = record.file.map(file => ({
        file: file,
        url: `${PB_URL}/api/files/${record.collectionId}/${record.id}/${file}`
      }))
      return { files: files }
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }
  }
}