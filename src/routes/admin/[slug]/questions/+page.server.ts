import { redirect, fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ locals, request, params }) => {
    const data = await request.formData();
    const schema = JSON.parse(data.get('schema'))

    let record, base

    try {
      record = await locals.pb.collection('applications').update(params.slug, {
        questions: schema
      })
    }
    catch (err) {
      return fail(400, { success: false });
    }

    try {
      let dbschema = schema.map((i, idx) => {
        if(i.type == 'ShortText'){
          return {
            name: ''+idx,
            type: 'text',
          }
        }
        else if(i.type == 'LongText'){
          return {
            name: ''+idx,
            type: 'editor',
          }
        }
        else if(i.type == 'Radio'){
          return {
            name: ''+idx,
            type: 'select',
            options: {
              maxSelect: 1,
              values: i.details.selections,
            }
          }
        }
        else if(i.type == 'Checkbox'){
          return {
            name: ''+idx,
            type: 'select',
            options: {
              maxSelect: i.details.selections.length,
              values: i.details.selections,
            }
          }
        }
        else if(i.type == 'File'){
          return {
            name: ''+idx,
            type: 'file',
            options: {                                                                                                   
              maxSelect: 99,                                                                                             
              maxSize: 104857600,                                                                                        
            }
          }
        }
        else if(i.type == 'Table'){
          return {
            name: ''+idx,
            type: 'json',
          }
        }
      })

      if(!schema.length) {
        dbschema = [
          { name: 'uwu', type: 'bool' }
        ]
      }

      base = await locals.adminpb.collections.update(params.slug, {
        schema: dbschema
      })
    }
    catch (err) {
      return fail(400, { success: false })
    }

    if(record && base){
      return { success: true }
    }

  }
}