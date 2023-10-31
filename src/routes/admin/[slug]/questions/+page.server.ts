import { redirect, fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ locals, request, params }) => {
    const data = await request.formData();
    const schema = JSON.parse(data.get('schema'))

    console.log(JSON.stringify(schema, null, 2))

    let record

    try {
      record = await locals.pb.collection('applications').update(params.slug, {
        questions: schema
      })
    }
    catch (err) {
      return fail(400, { success: false });
    }

    if(record){
      return { success: true }
    }

  }
}