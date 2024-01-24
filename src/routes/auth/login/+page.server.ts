import { redirect, fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ locals, request, url }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')

    if (!username) {
      return fail(400, { type: 'error', message: 'Username empty' })
    }

    try {
      await locals.pb.collection('users').authWithPassword(username, password)
      const returnUrl = url.searchParams.get('r') || '/'      
      return { type: 'success', message: 'Logged in successfully', redirect: returnUrl }
    }
    catch (err) {
      if (err.status == 400) {
        return fail(400, { type: 'error', message: 'Incorrect credentials' })
      }
      if (err.status == 403) {
        return fail(400, { type: 'error', message: 'Database issue' })
      }
      return fail(400, { type: 'error', message: 'Unknown issue' })
    }
    
  }
}