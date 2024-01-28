import { superValidate } from "sveltekit-superforms/server"
import { formSchema } from "./schema"
import { fail } from "@sveltejs/kit"

export const load = async ({ locals }) => {
  return {
    form: await superValidate(locals.user, formSchema)
  }
}

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, formSchema)

    if (!form.valid) {
      return fail(400, { form, type: 'error', message: 'Submitted data invalid' })
    }

    let record

    try {
      let data = {...form.data}
      delete data.email
      delete data.username
      record = await event.locals.pb.collection('users').update(event.locals.user.id, data)
    }

    catch (err) {
      return fail(400, { form, type: 'error', message: 'Unable to update profile' })
    }

    form.data = record

    return { form, type: 'success', message: 'Profile updated successfully' }
  }
}