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

    let record, base

    try {
      record = await locals.pb.collection('applications').create({
        'name': 'New application',
        'description': 'Some description',
        'start': new Date(),
        'end': Infinity,
        'questions': []
      })
    }
    catch (err) {
      return fail(400, true);
    }

    try {
      base = await locals.adminpb.collections.create({
        name: record.id,
        type: 'base',
        schema: [
          { name: 'uwu', type: 'bool' }
        ]
      })
    }
    catch (err) {
      await locals.pb.collection('applications').delete(record.id);
      return fail(400, true);
    }

    if(record && base){      
      throw redirect(302, '/admin/'+record.id)
    }

  },
};