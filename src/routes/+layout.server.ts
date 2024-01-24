export const load = async ({ locals }) => {
  return {
    user: locals.user,
    toastmsg: locals.toast
  }
}