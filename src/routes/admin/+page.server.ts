import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
  const { username, email, admin } = locals.user

  return {
    username: username,
    email: email,
    admin: admin,
  }
}

export const actions = {
  default: async ({ locals, request }) => {

    let record

    try {
      record = await locals.pb.collection('applications').create({
        'name': 'New application',
        'description': 'Some description',
        'start': new Date(),
        'end': Infinity,
        'questions': {}
      })
    }
    catch (err) {
      return fail(400, true);
    }

    if(record){      
      throw redirect(302, '/admin/'+record.id)
    }

  },
};