import { error } from "@sveltejs/kit"

export const load = async ({ locals }) => {
  if (!locals.user || !locals.user.admin) {
    throw error(403, 'Forbidden')
  }

  try {
    const records = await locals.pb.collection('events').getFullList()
    return { events: records }
  }
  catch (err) {
    throw error(500, 'Database issue')
  }
}