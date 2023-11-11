import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
  const record = await locals.pb.collection('applications').getOne(params.slug)

  const { username, email, admin } = locals.user
  return {
    record: record,
    username: username,
    email: email,
    admin: admin,
  }
}

export const actions = {
  default: async ({ locals, request, params }) => {
    const data = await request.formData();
    const response = JSON.parse(data.get('response'))

    try {
      response.responder = locals.user.id
      await locals.pb.collection(params.slug).create(response)
      throw redirect(302, '')
    }
    catch (err) {
      if(err?.status == 302){
        throw redirect(302, '/application/'+params.slug+'/success')
      }
      return fail(400, { status: 'Failed to submit response' });
    }

  },
};