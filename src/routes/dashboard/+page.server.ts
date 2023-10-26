export const load = async ({ locals, params }) => {
  const { username, email, admin } = locals.user
  return {
    username: username,
    email: email,
    admin: admin,
  }
}