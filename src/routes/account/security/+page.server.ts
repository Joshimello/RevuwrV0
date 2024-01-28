import { fail } from "@sveltejs/kit"

export const actions = {
  logout: async (event) => {
    try {
      event.locals.pb.authStore.clear()      
    }
    catch (err) {
      return fail(400, { type: 'error', message: 'Failed to logout' })
    }

    return { type: 'success', message: 'Successfully logged out', invalidate: true }
  }
}