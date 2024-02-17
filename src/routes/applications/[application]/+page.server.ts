import { error, redirect } from "@sveltejs/kit"

export const load = async ({ locals, params }) => {
  try {
    const record = await locals.pb.collection('applications').getOne(params.application, {
      expand: 'event,responder'
    })

    return { application: record }
  }
  catch (err) {
    return error(500, err?.message || JSON.stringify(err))
  }
}

export const actions = {
  default: async ({ locals, request }) => {

  }
}