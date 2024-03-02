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
  submit: async ({ locals, request }) => {

  },
  file: async ({ locals, request }) => {
    const data = await request.formData()
    data.append('user', locals.user.id)

    try {
      const record = await locals.pb.collection('files').create(data)
      console.log(record)
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