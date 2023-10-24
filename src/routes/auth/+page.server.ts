import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ locals, request }) => {
    const data = await request.formData();
    const user = data.get('user')
    const pass = data.get('pass')

    try {
      await locals.pb.collection('users').authWithPassword(user, pass)
    }
    catch (err) {
      // auth error
    }

    if(locals.user){
      throw redirect(302, '/dashboard')
    }

  },
};