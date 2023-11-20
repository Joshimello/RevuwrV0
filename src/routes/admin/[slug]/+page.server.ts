import { redirect, fail } from '@sveltejs/kit';

export const actions = {
  update: async ({ locals, request, params }) => {
    const data = await request.formData();

    const start = data.get('start')
    const end = data.get('end')
    if(start) data.set('start', (new Date(start)).toISOString())
    if(end) data.set('end', (new Date(end)).toISOString())

    let record

    try {
      record = await locals.pb.collection('applications').update(params.slug, data)
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