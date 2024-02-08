import { redirect, fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ locals, request, url }) => {
    const data = await request.formData()
    const email = data.get('email')
    const username = data.get('username')
    const password = data.get('password')
    const passwordconf = data.get('passwordconf')

    if (!email) {
      return fail(400, { type: 'error', message: 'Email empty' })
    }

    if (!username) {
      return fail(400, { type: 'error', message: 'Username empty' })
    }

    if (passwordconf !== password) {
      return fail(400, { type: 'error', message: 'Password not equal' })
    }

    try {
      const newuser = {
        username: username,
        email: email,
        emailVisibility: true,
        password: password,
        passwordConfirm: passwordconf
      }
      await locals.pb.collection('users').create(newuser)
      const returnUrl = url.searchParams.get('r') || '/'
      return { type: 'success', message: 'Account created successfully', redirect: returnUrl }
    }
    catch (err) {
      if (err.status == 400) {
        return fail(400, { type: 'error', message: 'Error creating' })
      }
      if (err.status == 403) {
        return fail(400, { type: 'error', message: 'Database issue' })
      }
      console.log(err)
      return fail(400, { type: 'error', message: 'Unknown issue' })
    }

  }
};