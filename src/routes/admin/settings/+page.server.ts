import { error } from "@sveltejs/kit"

export const load = async ({ locals }) => {
  try {
    const records = await locals.pb.collection('users').getFullList()
    return { users: records }
  }
  catch (err) {
    return error(500, err?.message || JSON.stringify(err))
  }
}

export const actions = {
  role: async ({ locals, request, url }) => {
    const data = await request.formData()
    const id = data.get('id') as string
    const role = data.get('role') as string

    const admin = (role == 'false' ? true : false)

    try {
      await locals.pb.collection('users').update(id, {
        admin: admin
      })
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }
  }
}