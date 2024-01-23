import { redirect, fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ locals, request, url }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')

    if (!username) {
      return fail(400, { status: 'Username empty' })
    }

    try {
      await locals.pb.collection('users').authWithPassword(username, password)
      throw { status: 302 }
    }

    catch (err) {
      if (err.status == 400) {
        return fail(400, { status: 'Incorrect credentials' })
      }
      if (err.status == 403) {
        return fail(400, { status: 'Database issue' })
      }
      if (err.status == 302) {
        const returnUrl = url.searchParams.get('r') || '/'
        throw redirect(302, returnUrl)
      }
      return fail(400, { status: 'Unknown issue' })
    }
    
  }
}