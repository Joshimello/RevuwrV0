import { redirect } from "@sveltejs/kit"

export const load = ({ locals, url }) => {
  if (!locals.user && url.pathname != '/account') {
    throw redirect(302, '/account')
  }
}