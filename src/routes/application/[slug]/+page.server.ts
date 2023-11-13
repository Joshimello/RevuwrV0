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
    data.append('responder', locals.user.id)

    try {
      let record = await locals.adminpb.collection('applications').update(params.slug, {
        'idcount+': '1'
      })
      data.append('serial', record.idcount)
    }
    catch (err) {
      return fail(400, { status: 'Failed to submit response' });
    }

    try {
      await locals.pb.collection(params.slug).create(data)
      throw redirect(302, '')
    }
    catch (err) {
      if(err?.status == 302){
        throw redirect(302, '/application/'+params.slug+'/success')
      }
      // console.log(err)
      return fail(400, { status: 'Failed to submit response' });
    }

  },
};