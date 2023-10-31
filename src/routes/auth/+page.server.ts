import { redirect, fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ locals, request, url }) => {
    const data = await request.formData();
    const user = data.get('user')
    const pass = data.get('pass')

    console.log(url.searchParams.get('r'))

    try {
      await locals.pb.collection('users').authWithPassword(user, pass)
      throw redirect(302, '')
    }
    catch (err) {
      if(err?.status == 302){
        throw redirect(302, url.searchParams.get('r') || '/dashboard')
      }
      return fail(400, true);
    }

  },
};