import { error } from "@sveltejs/kit"

export const load = async ({ locals, depends }) => {
  if (!locals.user || !locals.user.admin) {
    throw error(403, 'Forbidden')
  }

  depends('app:events')

  try {
    const records = await locals.pb.collection('events').getFullList()
    return { events: records }
  }
  catch (err) {
    return error(500, err?.message || JSON.stringify(err))
  }
}