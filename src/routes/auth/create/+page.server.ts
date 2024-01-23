import { redirect, fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ locals, request, url }) => {
    const data = await request.formData()
    const email = data.get('email')
    const username = data.get('username')
    const password = data.get('password')
    const passwordconf = data.get('passwordconf')

    if(passwordconf != password) {
      return fail(400, { status: 'Password not equal' })
    }



    try {
      await locals.pb.collection('users').authWithPassword(username, password)
    }

    catch (err) {
      console.log(err)
    }


    // try {
    //   await locals.pb.collection('users').authWithPassword(user, pass)
    //   throw redirect(302, '')
    // }
    // catch (err) {
    //   if(err?.status == 403){
    //     return fail(400, { status: 'Experiencing server issues' })
    //   }
    //   if(err?.status == 302){
    //     throw redirect(302, url.searchParams.get('r') || '/dashboard')
    //   }
    //   return fail(400, { status: 'Incorrect credentials' });
    // }

  }
};