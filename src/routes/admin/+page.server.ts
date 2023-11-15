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
          { id: 'serial_______id', name: 'serial', type: 'text' },
          { id: 'responder____id', name: 'responder', type: 'relation', options: { collectionId: '_pb_users_auth_' } },
          { id: 'status_______id', name: 'status', type: 'relation', options: { collectionId: 'omcr05owwhcmxkn' } },
        ],
        listRule: '@request.auth.id != ""',
        viewRule: '@request.auth.id != ""',
        createRule: '@request.auth.id != ""',
        updateRule: '@request.auth.id != "" && (responder = @request.auth.id || @request.auth.admin = true)',
        deleteRule: '@request.auth.id != "" && (responder = @request.auth.id || @request.auth.admin = true)',
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