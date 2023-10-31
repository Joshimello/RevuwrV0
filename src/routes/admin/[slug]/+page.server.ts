import { redirect, fail } from '@sveltejs/kit';

export const actions = {
  update: async ({ locals, request, params }) => {
    const data = await request.formData();
    const name = data.get('name')
    const description = data.get('description')
    const start = data.get('start')
    const end = data.get('end')
    const endtime = data.get('endtime')

    let record

    try {
      record = await locals.pb.collection('applications').update(params.slug, {
        name: name,
        description: description,
        start: new Date(start),
        end: new Date(end+' '+endtime)
      })
    }
    catch (err) {
      return fail(400, { success: false });
    }

    if(record){
      return { success: true }
    }

  },
  delete: async ({ locals, request, params }) => {
    try {
      await locals.pb.collection('applications').delete(params.slug)
      await locals.adminpb.collections.delete(params.slug)
    }
    catch (err) {
      return fail(400, { success: false })
    }

    throw redirect(302, '/admin')
  }
}