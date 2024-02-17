import { error, redirect } from "@sveltejs/kit"

export const load = async ({ locals, params }) => {
  try {
    const records = await locals.pb.collection('applications').getFullList({
      expand: 'event',
      filter: `responder = "${locals.user.id}"`
    })
    return { applications: records }
  }
  catch (err) {
    return error(500, err?.message || JSON.stringify(err))
  }
}