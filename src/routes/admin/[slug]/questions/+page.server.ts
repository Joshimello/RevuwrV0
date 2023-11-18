import { redirect, fail } from '@sveltejs/kit';
import { nanoid } from 'nanoid'

export const actions = {
  default: async ({ locals, request, params }) => {
    const data = await request.formData();
    const schema = JSON.parse(data.get('schema'))

    let record, base

    try {
      schema.forEach(i => {
        i.id = i.id || nanoid(15)
      })
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
            id: i.id,
            name: ''+idx,
            type: 'text',
          }
        }
        else if(i.type == 'LongText'){
          return {
            id: i.id,
            name: ''+idx,
            type: 'editor',
          }
        }
        else if(i.type == 'Radio'){
          return {
            id: i.id,
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
            id: i.id,
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
            id: i.id,
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
            id: i.id,
            name: ''+idx,
            type: 'json',
          }
        }
      })

      base = await locals.adminpb.collections.update(params.slug, {
        schema: [
          { id: 'serial_______id', name: 'serial', type: 'text' },
          { id: 'responder____id', name: 'responder', type: 'relation', options: { collectionId: '_pb_users_auth_' } },
          { id: 'status_______id', name: 'status', type: 'relation', options: { collectionId: 'omcr05owwhcmxkn' } },
          { id: 'statusinfo___id', name: 'statusinfo', type: 'json' },
          ...dbschema
        ]
      })
    }
    catch (err) {
      // console.log(err)
      return fail(400, { success: false })
    }

    if(record && base){
      return { success: true }
    }

  }
}